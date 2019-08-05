import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire';
import { auth } from "./plugins/firebase";
import VueHtmlToPaper from 'vue-html-to-paper';

Vue.config.productionTip = false;

Vue.use(firestorePlugin)
Vue.use(vuetify)
Vue.use(VueHtmlToPaper, {
  name: '_blank',
  specs: [
    'fullscreen=yes',
    // 'titlebar=yes',
    // 'scrollbars=yes'
  ],
  styles: [
    'https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css',
    'https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css'
  ]
})


let app: any;
auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
