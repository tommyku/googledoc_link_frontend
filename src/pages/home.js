class PageHome extends HTMLElement {
  constructor() {
    super();

    const template = homeDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));

    this.itemsDisplayed = 0;
  }

  connectedCallback() {
    const $localStorage = document.querySelector('local-storage');
    const $dataStore = document.querySelector('data-store');
    const $ajaxRequest = document.querySelector('ajax-request');
    const store = $localStorage.store;

    if ($dataStore.store) {
      this.entriesCount = $dataStore.store.length;
      this.hideLoader();
      this.revealList();
      this.registerInfiniteScroll();
      return;
    }

    if (store['url']) {
      $ajaxRequest.setAttribute('url', store['url']);
      $ajaxRequest.reload()
        .then((response) => response.json())
        .then((json) => this.updateList(json))
        .then(() => this.revealList())
        .then(() => this.hideLoader())
        .then(() => this.registerInfiniteScroll())
        .catch((e) => this.updateListError(e));
    } else {
      const $appRouter = document.querySelector('app-router');
      $appRouter.go('/welcome');
    }
  }

  registerInfiniteScroll() {
    // setup infinite scroll
    const $infiniteFloat = this.shadowRoot.querySelector('main');
    const $infinite = this.shadowRoot.querySelector('.infinite');
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9
    }

    const observer = new IntersectionObserver(() => this.revealList(), options);
    observer.observe($infinite);
  }

  hideLoader() {
    const $loader = this.shadowRoot.querySelector('.loader');
    $loader.style.display = 'none';
  }

  updateList(json) {
    const $dataStore = document.querySelector('data-store');
    const $elasticlunrIndex = document.querySelector('elasticlunr-index');
    $dataStore.replace(json.feed.entry);
    json.feed.entry.forEach((item, index) => {
      $elasticlunrIndex.addDoc({
        title: item['gsx$title']['$t'],
        description: item['gsx$description']['$t'],
        url: item['gsx$link']['$t'],
        id: index
      });
    })
    this.entriesCount = json.feed.entry.length;
  }

  revealList(count) {
    if (this.debounced) {
      return;
    } else {
      this.debounced = true;
    }

    const $list = this.shadowRoot.querySelector('.list');
    const $dataStore = document.querySelector('data-store');
    const itemsToDisplay = count || 20;
    const endKey = Math.min(
      Math.max(0, this.itemsDisplayed + itemsToDisplay - 1),
      this.entriesCount - 1
    );

    $dataStore.store
      .slice(this.itemsDisplayed, endKey)
      .forEach((item, index) => {
        const $linkItem = document.createElement('link-item');
        $linkItem.setAttribute('title', item['gsx$title']['$t']);
        $linkItem.setAttribute('url', item['gsx$link']['$t']);
        $linkItem.setAttribute('description', item['gsx$description']['$t']);
        $list.appendChild($linkItem);
      });

    this.itemsDisplayed += itemsToDisplay;

    setTimeout(() => (this.debounced = false), 250);
  }

  updateListError(e) {
    this.hideLoader();
    const $error = this.shadowRoot.querySelector('.error');
    $error.style.display = 'block';
  }
}

customElements.define('page-home', PageHome);
