export const routes = [
  {
    path: '/',
    name: 'random',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/memorable',
    name: 'memorable',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/passphrase',
    name: 'passphrase',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/domain',
    name: 'domain',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/developer',
    name: 'developer',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/custom',
    name: 'custom',
    component: () => import('./views/LandingPage/index.js')
  },
  {
    path: '/why',
    name: 'why',
    component: () => import('./views/Why.vue')
  },
  {
    path: '/blog',
    name: 'Blog',
    component: () => import('./views/Blog.vue')
  },
  {
    path: '/blog/:slug',
    name: 'BlogPost',
    component: () => import('./views/BlogPost.vue')
  }
];

