<template>
  <v-dialog v-model="show" persistent max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>เพิ่มโปร / หุ้น</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md12 sm12 xl12>
            <v-select outlined :items="[`item`,`money`]" v-model="subPurchase.type"></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap v-if="subPurchase.type == 'money'">
          <v-flex xs12 md12 sm12 xl12>
            <v-text-field
              label="ชื่อโปร / หุ้น"
              v-model="subPurchase.name"
              outlined
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              label="จำนวนลงทุน"
              v-model="subPurchase.deposit"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              label="ผลตอบแทน"
              v-model="subPurchase.reward"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12 xl12 sm12 text-center>
            <v-date-picker full-width v-model="picker"></v-date-picker>
          </v-flex>
        </v-layout>

        <v-layout row wrap v-if="subPurchase.type == 'item'">
          <v-flex xs12 md12 sm12 xl12>
            <v-text-field
              label="ชื่อโปร / หุ้น"
              v-model="subPurchase.name"
              outlined
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
              outlined
              label="จำนวนลงทุน"
              v-model="subPurchase.deposit"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
              outlined
              label="ผลตอบแทน"
              v-model="subPurchase.item"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md2>
            <v-text-field
              outlined
              label="จำนวน"
              v-model="subPurchase.itemAmount"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12 xl12 sm12 text-center>
            <v-date-picker full-width v-model="picker"></v-date-picker>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" outlined @click="addSubPurchase()">เพิ่มโปร / หุ้น</v-btn>
        <v-btn color="error" outlined @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { SubPurchase } from "../../models/SubPurchase";
import { subPurchaseService } from "../../services/subPurchase.service";
@Component
export default class AddBankAccount extends Vue {
  @Prop()
  private show!: boolean;
  private subPurchase: SubPurchase = {
    id: undefined,
    name: "",
    type: "item",
    deposit: 0,
    reward: 0,
    item: "",
    itemAmount: 0,
    memberId: "",
    purchaseId: "",
    bankAccountId: "",
    createAt: new Date().toISOString().substr(0, 10)
  };
  private type: string = "เลือก";
  private picker: any = "";

  mounted() {}

  @Emit(`added`)
  private async addSubPurchase() {
    this.subPurchase.memberId = this.memberId;
    this.subPurchase.bankAccountId = this.bankAccountId;
    this.subPurchase.purchaseId = this.purchaseId;
    this.subPurchase.createAt = this.picker;
    await subPurchaseService.create(this.subPurchase);
    this.close();
  }

  clear() {
    this.subPurchase = new SubPurchase();
  }
  @Emit(`close`)
  close() {
    this.clear();
  }

  get bankAccountId() {
    return this.$store.state.currentBankAccount.id;
  }

  get memberId() {
    return this.$store.state.currentMember.id;
  }

  get purchaseId() {
    return this.$store.state.currentPurchase.id;
  }
}
</script>

<style scoped>
</style>