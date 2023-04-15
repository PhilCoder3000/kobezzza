export type Route = {
  path: string;
  element: () => HTMLDivElement;
};

class Router {
  routes: Route[] = [];
  #page: HTMLDivElement;

  constructor(routes: Route[]) {
    this.routes = routes;
    const initPage = routes.find(({path}) => path === '/');
    if (initPage) {
      this.#page = initPage.element()
    } else {
      this.#page = document.createElement('div')
    }
  }

  route = (event: MouseEvent) => {
    const e = event || window.event;
    const target = e.target as HTMLAnchorElement;
    e.preventDefault();
    if (document.body.contains(this.#page)) {
      document.body.removeChild(this.#page)
    }
    window.history.pushState({}, '', target.href);
    const currentPath = window.location.pathname;
    const route = this.routes.find(({ path }) => path === currentPath);
    if (route) {
      this.#page = document.createElement('div');
      this.#page.appendChild(route.element());
      document.body.appendChild(this.#page);
    }
  }


  getPath() {
    return this.routes.map(({ path }) => path);
  }
}

export default Router;
