import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import Vuex from 'vuex'
import 'buefy/dist/buefy.css'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

Vue.use(VueSweetalert2)
// import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


// Vue.use(BootstrapVue)
Vue.config.productionTip = false
Vue.use(Buefy)
Vue.use(Vuex)
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
