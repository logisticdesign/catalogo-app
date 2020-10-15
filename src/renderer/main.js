import Vue from 'vue'
import axios from 'axios'

import db from './datastore'
import './assets/css/styles.css'

import App from './App'
import store from './store'
import router from './router'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

// Token autenticazione
const token = localStorage.getItem('token')

if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

Vue.prototype.$db = db
Vue.http = Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')
