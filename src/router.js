import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'random',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/memorable',
    name: 'memorable',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/passphrase',
    name: 'passphrase',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/domain',
    name: 'domain',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/developer',
    name: 'developer',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/custom',
    name: 'custom',
    component: () => import('./views/LandingPage')
  },
  {
    path: '/why',
    name: 'why',
    component: () => import('./views/Why')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('./views/Blog')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('./views/BlogPost')
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

export default router;
