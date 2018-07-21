class PageHome extends HTMLElement {
  constructor() {
    super();

    const template = homeDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));

  }

  connectedCallback() {
    const $localStorage = document.querySelector('local-storage');
    const $ajaxRequest = document.querySelector('ajax-request');
    const store = $localStorage.store;

    if (store['url']) {
      $ajaxRequest.setAttribute('url', store['url']);
      $ajaxRequest.reload()
        .then((response) => response.json())
        .then((json) => this.updateList(json))
        .then(() => this.hideLoader())
        .catch((e) => this.updateListError(e));
    } else {
      const $appRouter = document.querySelector('app-router');
      $appRouter.go('/welcome');
    }
  }

  hideLoader() {
    const $loader = this.shadowRoot.querySelector('.loader');
    $loader.style.display = 'none';
  }

  updateList(json) {
    console.log(json);
  }

  updateListError(e) {
    this.hideLoader();
    const $error = this.shadowRoot.querySelector('.error');
    $error.style.display = 'block';
  }
}

customElements.define('page-home', PageHome);
