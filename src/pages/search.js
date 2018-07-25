class PageSearch extends HTMLElement {
  constructor() {
    super();

    const template = searchDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));
  }

  connectedCallback() {
    const $searchButton = this.shadowRoot.querySelector('button');
    $searchButton.addEventListener('click', () => this.searchButtonClick());
  }

  searchButtonClick() {
    const $searchButton = this.shadowRoot.querySelector('button');
    $searchButton.setAttribute('disabled', true);

    const $input = this.shadowRoot.querySelector('input');
    const searchTerm = $input.value;

    if (searchTerm.length > 0) {
      const $elasticlunrIndex = document.querySelector('elasticlunr-index');
      const $dataStore = document.querySelector('data-store');

      const results = $elasticlunrIndex.search(searchTerm);
      const links = results.map(({ ref }) => {
        return $dataStore.store[ref];
      });

      const $list = this.shadowRoot.querySelector('.list');
      $list.innerHTML = '';

      links
        .forEach((item, index) => {
          const $linkItem = document.createElement('link-item');
          $linkItem.setAttribute('title', item['gsx$title']['$t']);
          $linkItem.setAttribute('url', item['gsx$link']['$t']);
          $linkItem.setAttribute('description', item['gsx$description']['$t']);
          $list.appendChild($linkItem);
        });
    } else {
      alert('Dude, if you are searching at least input something.');
    }

    setTimeout(() => $searchButton.removeAttribute('disabled'), 500);
  }
}

customElements.define('page-search', PageSearch);
