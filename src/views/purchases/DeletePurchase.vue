<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500px"
    transition="dialog-transition"
    v-if="purchase.id"
  >
    <v-card>
      <v-card-title primary-title>ลบ{{purchase.type}}</v-card-title>
      <v-card-text>ยืนยันการลบ{{purchase.type}} {{purchase.name}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="deletePurchase()">ยืนยัน</v-btn>
        <v-btn color="error" @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Purchase } from "../../models/Purchase";
import { purchaseService } from "../../services/purchase.service";

@Component
export default class DeletePurchase extends Vue {
  @Prop()
  private show!: boolean;

  @Prop()
  private purchase!: Purchase;

  @Emit(`deleted`)
  async deletePurchase() {
    this.$store.commit(`setLoading`, true);
    await purchaseService.delete(<string>this.purchase.id);
    this.$store.commit(`setLoading`, false);
    this.close();
  }

  @Emit(`close`)
  close() {}
}
</script>

<style scoped>
</style>