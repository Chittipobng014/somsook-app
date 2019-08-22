<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500px"
    transition="dialog-transition"
    v-if="subPurchase.id"
  >
    <v-card>
      <v-card-title primary-title>ลบ{{subPurchase.name}}</v-card-title>
      <v-card-text>ยืนยันการลบ{{subPurchase.name}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="deleteSubPurchase()">ยืนยัน</v-btn>
        <v-btn color="error" @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SubPurchase } from "../../models/SubPurchase";
import { subPurchaseService } from "../../services/subPurchase.service";

@Component
export default class DeleteSubPurchase extends Vue {
  @Prop()
  private show!: boolean;

  @Prop()
  private subPurchase!: SubPurchase;

  @Emit(`deleted`)
  async deleteSubPurchase() {
    this.$store.commit(`setLoading`, true);
    await subPurchaseService.delete(<string>this.subPurchase.id);
    this.$store.commit(`setLoading`, false);
    this.close();
  }

  @Emit(`close`)
  close() {}
}
</script>

<style scoped>
</style>