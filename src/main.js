// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'styles/index.css'
import './permission' // 权限
import comments from 'components'
import msgBox from 'components/msgbox/popup'
import tipNote from 'components/messages/masklayer'
import filter from './util/filter/index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$msgbox = msgBox
Vue.prototype.$tipNote = tipNote

Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
