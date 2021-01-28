import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  showTable: false,
  render: h => h(App)
}).$mount('#app')
