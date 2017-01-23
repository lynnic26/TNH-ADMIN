import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'
import Login from './pages/login.vue'
import Notfound from './pages/Notfound.vue'

Vue.use(ElementUI)
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  }, {
    path: '*',
    component: Notfound	
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
