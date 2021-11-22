import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import OutlineBar from '../components/OutlineBar.vue'
import Area from '../views/Area.vue'
import Device from '../views/Device.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/operator',
    name: 'Operator',
    component: OutlineBar,
    props: true,
    children:[
      {
        path: 'area',
        component: Area
      },{
        path: 'devices',
        component: Device,
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '*',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
