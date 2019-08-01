<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="500px"
    transition="dialog-transition"
    v-if="bankAccount.id"
  >
    <v-card>
      <v-card-title primary-title>ลบสมุดบัญชี</v-card-title>
      <v-card-text>ยืนยันการลบข้อมูลสมุดบัญชีหมายเลข {{bankAccount.number}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="deleteBankAccount()">ยืนยัน</v-btn>
        <v-btn color="error" @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BankAccount } from "../../models/BankAcount";
import { bankAccountService } from "../../services/bankAccount.service";

@Component
export default class DeleteBankAccount extends Vue {
  @Prop()
  private show!: boolean;

  @Prop()
  private bankAccount!: BankAccount;

  @Emit(`deleted`)
  async deleteBankAccount() {
    this.$store.commit(`setLoading`, true);
    await bankAccountService.delete(<string>this.bankAccount.id);
    this.$store.commit(`setLoading`, false);
    this.close();
  }

  @Emit(`close`)
  close() {}
}
</script>

<style scoped>
</style>