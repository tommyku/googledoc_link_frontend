class LocalStorage extends HTMLElement {
  constructor() {
    super();

    let store = {};
    const subscriptions = [];
    const storeName = this.getAttribute('store') || 'untitled-store';

    const storeContent = localStorage.getItem(storeName);

    if (storeContent) {
      try {
        store = JSON.parse(storeContent);
      } catch (_) {
        console.warn('Unable to parse store content');
      }
    }

    this._store = store;
    this.subscriptions = subscriptions;
    this.storeName = storeName;

    this.addEventListener('update', (e) => this.update(e));

    this.addEventListener('subscribe', (e) => this.subscribe(e));
  }

  update(e) {
    this._store = Object.assign({}, this._store, e.detail.data);
    localStorage.setItem(this.storeName, JSON.stringify(this._store));

    this.subscriptions.forEach((callback) => callback(this._store));
  }

  subscribe(e) {
    this.subscriptions.push(e.detail.callback);
  }

  get store() {
    return this._store;
  }

  set store(data) {
    this.update({
      detail: { data }
    });
  }
}

customElements.define('local-storage', LocalStorage);
