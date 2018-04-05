// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vue2Socketcluster from '../../src/index.js'

Vue.config.productionTip = false

Vue.use(Vue2Socketcluster,{
	hostname:"localhost",
	port:3000
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  mounted() {
  	let vm = this

  	vm.$socket.on('connect',status => {
  		console.log('Connected')
  		console.log(status)
  	})

  }
})
