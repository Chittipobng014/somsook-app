<template>
  <v-overlay :value="loading">
    <v-progress-circular indeterminate size="64"></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Loading extends Vue {
  @Prop()
  private loading!: boolean;
}
</script>

<style scoped>
</style>