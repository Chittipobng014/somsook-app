<template>
  <v-dialog v-model="show" persistent max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>เพิ่มสมุดบัญชี</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              label="ธนาคาร"
              v-model="bankAccount.provider"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              label="สาขา"
              v-model="bankAccount.campus"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12>
            <v-text-field
              outlined
              label="เลขบัญชี"
              v-model="bankAccount.number"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="createBankAccount()">เพิ่มสมุดบัญชี</v-btn>
        <v-btn color="error" outlined @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SubPurchase } from "../../models/SubPurchase";
@Component
export default class AddBankAccount extends Vue {
  //   @Prop()
  //   private show!: boolean;
  //   @Prop()
  //   private memberId!: string;
  //   private subPurchase: SubPurchase = {
  //     deposit: 0,
  //     memberId: this.memberId,
  //     purchaseId: this.p
  //     id: undefined
  //   };
  //   mounted() {
  //     this.bankAccount.memberId = this.memberId;
  //   }
  //   clear() {
  //     this.bankAccount.number = "";
  //     this.bankAccount.campus = "";
  //     this.bankAccount.provider = "";
  //     this.bankAccount.memberId = this.memberId;
  //   }
  //   @Emit(`close`)
  //   close() {
  //     this.clear();
  //   }
}
</script>

<style scoped>
</style>