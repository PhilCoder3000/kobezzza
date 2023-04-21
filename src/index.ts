import Router, { Route } from './utils/routing';
import './homeworks/2-canvas/ImageMaker';
import './index.css';
import { renderMain } from './homeworks/1-bitwise';
import { renderHM2 } from './homeworks/2-canvas/ImageMaker';
import { renderHM3 } from './homeworks/3-list/renderHM3';

const body = document.querySelector('body') as HTMLBodyElement;
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

const routes: Route[] = [
  {
    path: '/',
    element: renderMain
  },
  {
    path: '/homework-2',
    element: renderHM2,
  },
  {
    path: '/homework-3',
    element: renderHM3
  }
];

const router = new Router(routes);

const ul = document.createElement('ul');

router.getPath().forEach((path) => {
  const li = document.createElement('li');
  const link = document.createElement('a');
  li.appendChild(link);
  link.href = path;
  link.innerText = path;
  link.onclick = router.route;
  ul.appendChild(li);
});

body.appendChild(ul);
