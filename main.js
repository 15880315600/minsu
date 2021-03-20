import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import uView from "uview-ui"
Vue.use(uView)

// Vue.prototype.baseUrl = 'http://192.168.2.168/img/'
Vue.prototype.baseUrl = 'https://nongmai.beetry.com/img/'
App.mpType = 'app'

const app = new Vue({
    ...App
})

import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

app.$mount()
