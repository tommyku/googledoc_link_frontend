class ElasticlunrIndex extends HTMLElement {
  constructor() {
    super();

    this._index = elasticlunr(function() {
      this.addField('title');
      this.addField('description');
      this.addField('url');
      this.setRef('id');
    });
  }

  addDoc(doc) {
    this._index.addDoc(doc);
  }

  search(term, options = {}) {
    return this._index.search(term, options);
  }
}

customElements.define('elasticlunr-index', ElasticlunrIndex);
