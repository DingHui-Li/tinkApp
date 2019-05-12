
import Vue from 'vue'
import App from './App.vue'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueMaterial);
Vue.use(VueAwesomeSwiper);
Vue.use(VueAxios, axios);

export const userData={
  userid:'200022508',
  apikey:'3b8d6743d01c4cb4a68ece637b4a316d',
  deviceid:'200041320'
}

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
