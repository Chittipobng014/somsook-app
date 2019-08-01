import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { firestorePlugin } from 'vuefire';
import { auth } from "./plugins/firebase";

Vue.config.productionTip = false;

Vue.use(firestorePlugin)
Vue.use(vuetify)



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
