import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './plugins/firebase';
import { membersCollection } from "./modules/db";
import createPersistedState from 'vuex-persistedstate'
// import Cookies from 'js-cookie';

Vue.use(Vuex);

auth.onAuthStateChanged(user => {
  if (user) {
    store.commit(`setCurrentUser`, user);
  }
})

const store = new Vuex.Store({
  state: {
    loading: false,
    currentUser: null,
    members: [],
    currentMember: {},
    currentBankAccount: {},
    currentPurchase: {}
  },
  plugins: [createPersistedState()],
  mutations: {
    setLoading(state, val) {
      state.loading = val
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setMembers(state, val) {
      state.members = val
    },
    setCurrentMember(state, val) {
      state.currentMember = val
    },
    setCurrentBankAccount(state, val) {
      state.currentBankAccount = val
    },
    setCurrentPurchase(state, val) {
      state.currentPurchase = val
    }
  },
  actions: {

  },
});

export default store
