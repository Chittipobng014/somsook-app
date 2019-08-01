<template>
  <v-dialog v-model="show" persistent max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>เพิ่มสมุดบัญชี</v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-layout row wrap>
            <v-flex xs12 md6>
              <v-select outlined v-model="purchase.type" :items="purchaseTypes" label="ประเภท"></v-select>
            </v-flex>
            <v-flex xs12 md6>
              <v-text-field
                outlined
                label="ชื่อสัญญา/ดราฟ"
                v-model="purchase.name"
                :rules="[ v => !!v || 'จำเป็นต้องใส่ชื่อ']"
                required
              ></v-text-field>
            </v-flex>
            <v-flex xs12 md12>
              <v-text-field
                outlined
                label="จำนวนเงิน"
                v-model="purchase.amount"
                :rules="[ v => !!v || 'จำเป็นต้องใส่จำนวนเงิน']"
                required
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-form>
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
import { Purchase } from "../../models/Purchase";
import { purchaseService } from "../../services/purchase.service";

@Component
export default class AddPurchase extends Vue {
  @Prop()
  private show!: boolean;

  private valid: boolean = true;
  private lazy: boolean = false;
  private purchaseTypes = [`ดราฟ`, `สัญญา`];
  private purchase: Purchase = {
    id: undefined,
    type: `ดราฟ` || `สัญญา`,
    name: "",
    amount: "",
    bankAccountId: this.bankAccountId,
    memberId: this.memberId
  };

  @Emit(`created`)
  async createBankAccount() {
    // console.log(JSON.stringify(this.purchase.bankAccountId));
    this.$store.commit(`setLoading`, true);
    const newPurchase = await purchaseService.create(this.purchase);
    this.$store.commit(`setLoading`, false);
    this.close();
  }

  mounted() {}

  clear() {}

  get memberId() {
    return this.$store.state.currentMember.id;
  }

  get bankAccountId() {
    return this.$store.state.currentBankAccount.id;
  }

  @Emit(`close`)
  close() {
    this.clear();
  }
}
</script>

<style scoped>
</style>