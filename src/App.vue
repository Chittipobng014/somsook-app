<template>
  <v-app>
    <loading :loading="loading" />

    <nav-bar></nav-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NavBar from "./components/NavBar.vue";
import Loading from "./components/Loading.vue";

@Component({
  components: {
    NavBar,
    Loading
  }
})
export default class App extends Vue {
  get loading() {
    return this.$store.state.loading;
  }
  created() {
    this.$store.commit(`setLoading`, false);
  }
}
</script>
