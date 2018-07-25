class DataStore extends HTMLElement {
  constructor() {
    super();

    let store = {};
    this._store = this.store;
  }

  replace(data) {
    this._store = data;
  }

  get store() {
    return this._store;
  }
}

customElements.define('data-store', DataStore);

