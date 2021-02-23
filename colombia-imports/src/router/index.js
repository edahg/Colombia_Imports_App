import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Query from '../views/Queries'
import Suppliers from '../views/Suppliers'
//import store from '../store/index';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/savedqueries',
    name: 'Query',
    component: Query
  },
  {
    path: '/supplierslist',
    name: 'suppliers',
    component: Suppliers
  }
]

const router = new VueRouter({
  routes
})

/* router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.public)) {
      next();
  } else if (store.state.usuario) {
      if (to.matched.some(record => record.meta.auth)) {
          console.log(store.state.usuario);
          next();
      }
  } else {
      next({ name: 'login' });
  }
}) */

export default router
