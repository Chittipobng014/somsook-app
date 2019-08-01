<template>
  <v-container grid-list-md fluid>
    <v-layout row wrap justify-space-around text-xs-center>
      <v-flex md6 xs12>
        <v-text-field outlined label="Email" v-model="email"></v-text-field>
      </v-flex>
      <v-flex md6 xs12>
        <v-text-field outlined label="Password" type="password" v-model="password"></v-text-field>
      </v-flex>
      <v-flex md12 xs12 class="text-md-right">
        <v-btn color="success" @click="login">Login</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { emailLogin } from "../modules/auth";

@Component
export default class Login extends Vue {
  private email: string = "";
  private password: string = "";

  private async login() {
    this.$store.commit(`setLoading`, true);
    const user = await emailLogin(this.email, this.password);
    if (!user) {
      console.log(`No user`);
    }
    this.$store.commit(`setCurrentUser`, user);
    this.$store.commit(`setLoading`, false);
    this.$router.push(`/member`);
    this.$store.commit(`setLoading`, false);
  }
}
</script>

<style scoped>
</style>