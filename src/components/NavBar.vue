<template>
  <v-app-bar class="nav" color="amber lighten-1" app>
    <v-toolbar-title class="headline text-uppercase">
      <span class="black--text text--lighten-1">SOMSOOK APP</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      class="black--text text--lighten-1"
      text
      v-if="user"
      height="100%"
      @click="toMembersPage()"
    >สมาชิกทั้งหมด</v-btn>
    <v-btn
      class="black--text text--lighten-1"
      height="100%"
      text
      v-if="user"
      @click="logout()"
    >ออกจากระบบ</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { logout } from "../modules/auth";

@Component
export default class NavBar extends Vue {
  async logout() {
    await logout();
    this.$store.commit(`setCurrentUser`, null);
    this.$router.push(`/login`);
  }

  toMembersPage() {
    this.$router.push(`/members`);
  }

  private menu: string[] = [`สมาชิก`];

  get user() {
    return this.$store.state.currentUser;
  }
}
</script>

<style scoped>
.nav {
  background-color: #f0ba26;
}
</style>