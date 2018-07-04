class PageWelcome extends HTMLElement {
  constructor() {
    super();

    const template = welcomeDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));
  }

  connectedCallback() {
  }
}

customElements.define('page-welcome', PageWelcome);
