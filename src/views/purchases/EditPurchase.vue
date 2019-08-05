<template>
  <v-container grid-list-xs fluid>
    <add-sub-purchase
      :show="showAddSubPurchase"
      @close="showAddSubPurchase = !showAddSubPurchase"
      @added="fetchPurchase(),fetchSubPurchases()"
    />
    <v-layout row wrap mb-5>
      <v-flex xs12 md12 sm12 xl12 text-center>
        <h1>{{purchase.type}}</h1>
      </v-flex>
    </v-layout>
    <hr />
    <v-layout row wrap text-center mt-10>
      <v-flex xs12 md12 xl12 sm12>
        <h2>โปร / หุ้น ที่ลงทุน</h2>
      </v-flex>
      <v-flex xs12 md12 xl12 sm12 mt-5>
        <v-simple-table>
          <thead>
            <tr>
              <th class="table-header" style="text-align: center">เงินลงทุน</th>
              <th class="table-header" style="text-align: center">ผลตอบแทน</th>
              <th class="table-header" style="text-align: center">วันที่ซื้อ</th>
              <th style="text-align: right">
                <v-btn color="success" outlined @click="showAddSubPurchase = true">เพิ่มโปร / หุ้น</v-btn>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sp in subPurchases" :key="sp.id">
              <td>{{sp.deposit}}</td>
              <td>{{convertRowText(sp)}}</td>
              <td>{{dateConvert(sp.createAt)}}</td>
              <td style="text-align: right">
                <v-btn outlined color="warning" style="margin-right: 5px">แก้ไข</v-btn>
                <v-btn outlined color="error">ลบ</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import AddSubPurchase from "../subPurchases/AddSubPurchase.vue";
import { Vue, Component } from "vue-property-decorator";
import { Purchase } from "../../models/Purchase";
import { purchaseService } from "../../services/purchase.service";
import { SubPurchase } from "../../models/SubPurchase";
import { subPurchaseService } from "../../services/subPurchase.service";

@Component({
  components: {
    AddSubPurchase
  }
})
export default class EditPurchase extends Vue {
  private showAddSubPurchase: boolean = false;
  private purchase: Purchase = new Purchase();
  private subPurchases: SubPurchase[] = [];

  private async fetchPurchase() {
    this.purchase = await purchaseService.getById(this.$route.params.id);
    this.$store.commit(`setCurrentPurchase`, this.purchase);
  }

  private async fetchSubPurchases() {
    this.subPurchases = await subPurchaseService.getByPurchaseId(
      this.$route.params.id
    );
  }

  private dateConvert(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = "0" + date.getMinutes();
    const seconds = "0" + date.getSeconds();

    return `วันที่ ${date.getDate()}/${date.getMonth()}/${date.getFullYear()} เวลา ${hours} : ${minutes.substr(
      -2
    )} : ${minutes.substr(-2)}`;
  }

  private convertRowText(subPurchase: SubPurchase) {
    const text =
      subPurchase.type == `item`
        ? `${subPurchase.item} จำนวน ${subPurchase.itemAmount}`
        : `${subPurchase.reward} บาท`;
    return text;
  }

  async mounted() {
    this.$store.commit(`setLoading`, true);
    await this.fetchPurchase();
    await this.fetchSubPurchases();
    this.$store.commit(`setLoading`, false);
  }
}
</script>

<style scoped>
.table-header {
  font-size: 24px;
}

.table-text {
  font-size: 18px;
}
</style>