<template>
  <v-container grid-list-xs>
    <v-layout row wrap text-right>
      <v-flex md12 xs12>
        <v-btn color="info" @click="print()">ปริ้นท์</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap id="summary">
      <v-flex xs12 md12 class="text-center">
        <h1>ข้อมูลส่วนตัว</h1>
      </v-flex>
      <v-flex xs12 md12 sm12>
        <p>รหัสสมาชิก: {{summary.member.id}}</p>
      </v-flex>
      <v-flex md6 xs12 sm6 xl6>
        <p>ชื่อ - สกุล: {{summary.member.name}}</p>
        <p>หมายเลขประจำตัวประชาชน: {{summary.member.citizenId}}</p>
      </v-flex>
      <v-flex md6 xs12 sm6 xl6>
        <p>เบอร์โทรศัพท์: {{summary.member.phoneNumber}}</p>
        <p>ที่อยู่: {{summary.member.address}}</p>
      </v-flex>
      <v-flex xs12 md12 class="text-center">
        <h1>ข้อมูลบัญชีธนาคาร</h1>
      </v-flex>
      <v-flex xs12 md12 sm12 xl12>
        <v-simple-table>
          <thead>
            <tr>
              <th class="table-header">ธนาคาร</th>
              <th class="table-header">สาขา</th>
              <th class="table-header">เลขที่บัญชี</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="acc in summary.bankAccounts" :key="acc.id">
              <td class="table-text">{{ acc.provider }}</td>
              <td class="table-text">{{ acc.campus }}</td>
              <td class="table-text">{{ acc.number }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
      <v-flex xs12 md12 class="text-center">
        <h1>ข้อมูลโปร</h1>
      </v-flex>
      <v-flex xs12 md12 sm12 xl12>
        <v-simple-table>
          <thead>
            <tr>
              <th class="table-header">จำนวนเงิน</th>
              <th class="table-header">ผลตอบแทน</th>
              <th class="table-header">ชื่อโปร / หุ้น</th>
              <th class="table-header">วันที่ชำระเงิน</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="sp in summary.subPurchases" :key="sp.id">
              <td class="table-text">{{ sp.deposit }}</td>
              <td class="table-text">{{ sp.reward }}</td>
              <td class="table-text">{{ sp.name }}</td>
              <td class="table-text">{{ sp.createAt }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { reportService } from "../../services/report.service";
import { MemberSummary } from "../../models/MemberSummary";
import { BankAccount } from "../../models/BankAcount";
import { Purchase } from "../../models/Purchase";
import { SubPurchase } from "../../models/SubPurchase";

@Component
export default class MemberSummaryPage extends Vue {
  private summary: MemberSummary = new MemberSummary();
  async beforeMount() {
    this.$store.commit(`setLoading`, true);
    await this.fetchSummary();
    this.$store.commit(`setLoading`, false);
  }

  async fetchSummary() {
    this.summary = await reportService.memberSummary(this.memberId);
  }

  print() {
    this.$htmlToPaper(`summary`);
  }

  get memberId() {
    return this.$route.params.id;
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