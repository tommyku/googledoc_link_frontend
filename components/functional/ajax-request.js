class AjaxRequest extends HTMLElement {
  static get observedAttributes() { return ['url', 'defer']; }

  constructor() {
    super();

    let request = null;
    const url = this.getAttribute('url');
    const defer = this.getAttribute('defer');

    this.url = url;
    this.defer = defer;
    this.request = request;

    this.reloadAsNeeded();
  }

  reload() {
    this.request = fetch(this.url);
    return this.request;
  }

  reloadAsNeeded() {
    const defer = this.defer === 'null'
            || this.defer === 'false'
            || this.defer === null;

    if (this.url && defer) {
      this.reload();
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'url':
        if (oldValue !== newValue) {
          this.url = newValue;
          this.reloadAsNeeded();
        }
        break;
      case 'defer':
        // to turn off defer, use removeAttribute()
        this.defer = newValue;
        break;
      default:
        // pass
    }
  }
}

customElements.define('ajax-request', AjaxRequest);
