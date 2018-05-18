import Vue from 'vue'
import VueUniqIds from "vue-uniq-ids"
import App from './App.vue'

Vue.use(VueUniqIds, /* options */);

new Vue({
  el: '#app',
  render: h => h(App)
})
