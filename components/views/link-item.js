const patch = snabbdom.init([
  snabbdom_attributes.default,
]);
const h = snabbdom.h;

class LinkItem extends HTMLElement {
  constructor() {
    super();

    const template = linkItemDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));

  }

  connectedCallback() {
    this.info = {
      title: this.getAttribute('title'),
      url: this.getAttribute('url'),
      description: this.getAttribute('description'),
    };

    this.dom = {
      title: document.createElement('span'),
      url: document.createElement('span'),
      description: document.createElement('span'),
    };

    Object.values(this.dom).forEach((child) => this.appendChild(child));

    this.elm = {
      a: this.shadowRoot.querySelector('a')
    }

    this.render();
  }

  slots() {
    return {
      title: h('span', { attrs: { slot: 'title' } }, this.info.title),
      url: h('span', { attrs: { slot: 'url' } }, this.info.url),
      description: h('span', { attrs: { slot: 'description' } }, this.info.description.slice(0, 180) + '...')
    };
  }

  render() {
    const slots = this.slots();
    Object.keys(this.dom)
      .forEach((key) => patch(this.dom[key], slots[key]));
    this.elm.a.setAttribute('href', this.info.url);
  }

  getDomain(url) {
    return url;
  }
}

customElements.define('link-item', LinkItem);
