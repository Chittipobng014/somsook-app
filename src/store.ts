import Vue from 'vue';
import Vuex from 'vuex';
import { auth } from './plugins/firebase';
import { membersCollection } from "./modules/db";

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
    currentBankAccount: {}
  },
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
    }
  },
  actions: {

  },
});

export default store
