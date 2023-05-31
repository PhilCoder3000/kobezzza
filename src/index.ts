import Router, { Route } from './utils/routing';
import './index.css';
import { renderMain } from 'homeworks/1';
import { renderHM2 } from 'homeworks/2';
import { renderHM3 } from 'homeworks/3/renderHM3';
import { renderHM4 } from 'homeworks/4';
import { renderHM6 } from 'homeworks/6';
import { renderHM7 } from 'homeworks/7';
import { renderHM8 } from 'homeworks/8';
import { renderHM11 } from 'homeworks/11';
import { renderHM15 } from 'homeworks/15';

const body = document.querySelector('body') as HTMLBodyElement;
const root = document.createElement('div');
root.id = 'root';
body.appendChild(root);

const routes: Route[] = [
  {
    path: '/',
    element: renderMain,
  },
  {
    path: '/homework-2',
    element: renderHM2,
  },
  {
    path: '/homework-3',
    element: renderHM3,
  },
  {
    path: '/homework-4',
    element: renderHM4,
  },
  {
    path: '/homework-6',
    element: renderHM6,
  },
  {
    path: '/homework-7',
    element: renderHM7
  },
  {
    path: '/homework-8',
    element: renderHM8,
  },
  {
    path: '/homework-11',
    element: renderHM11,
  },
  {
    path: '/homework-15',
    element: renderHM15
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

