// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from 'router'
import 'router/filter'
import iView from 'iview'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import 'iview/dist/styles/iview.css'
import 'swiper/dist/css/swiper.css'

import 'component'
import 'style/index.styl'

Vue.config.productionTip = false

Vue.use(iView)
Vue.use(VueAwesomeSwiper)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
