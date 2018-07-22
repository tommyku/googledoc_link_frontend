class PageWelcome extends HTMLElement {
  constructor() {
    super();

    const template = welcomeDoc.querySelector('template')
      .content;
    this.attachShadow({ mode: 'open' })
      .appendChild(template.cloneNode(true));

  }

  connectedCallback() {
    const $button = this.shadowRoot.querySelector('#submit');
    $button.addEventListener('click', (e) => this.btnClick(e));
  }

  btnClick(_) {
    const $inputAjaxUrl = this.shadowRoot.querySelector('input#ajax-url');
    const url = $inputAjaxUrl.value;
    if (this.isValidUrl(url)) {
      const $localStorage = document.querySelector('local-storage');
      const $appRouter = document.querySelector('app-router');
      $localStorage.update({ detail: { data: { url } } });
      $appRouter.go('/home');
    } else {
      alert('Wrong URL! Check out the help page if you don\'t know what to input!');
    }
  }

  isValidUrl(url) {
    const pattern = /https:\/\/spreadsheets.google.com\/feeds\/list\/[-1-9A-z]+\/[-1-9A-z]+\/public\/values\?alt=json/;
    return typeof url == 'string' && url.match(pattern);
  }
}

customElements.define('page-welcome', PageWelcome);
