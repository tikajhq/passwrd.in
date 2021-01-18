import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component : ()=>import("./views/LandingPage")
    },
    {
      path: '/why',
      name: 'why',
      component : ()=>import("./views/Why")
    },
    {
      path: '/code',
      name: 'Code',
      component : ()=>import("./views/Code")
    },
  ]
});
