import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';

import MemberList from './views/members/MemberList.vue';
import EditMember from "./views/members/EditMember.vue";
import Login from './views/Login.vue';
import EditBankAccount from "./views/bankAccounts/EditBankAccount.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/members',
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/members',
      name: 'members',
      component: MemberList,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/member/:id',
      name: 'member',
      component: EditMember,
      meta: {
        requiresAuth: true
      },

    },
    {
      path: '/bankAccount/:id',
      name: 'bankAccount',
      component: EditBankAccount,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;
  if (requiresAuth && !currentUser) {
    next('/login');
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
