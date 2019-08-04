<template>
  <v-container grid-list-xs fluid v-if="member && bankAccounts">
    <add-bank-account
      :show="showAddBankAccount"
      :memberId="member.id"
      @close="showAddBankAccount = false"
      @created="fetchBankAccounts()"
    />
    <delete-bank-account
      :show="showDeleteBankAccount"
      :bankAccount="selectedDeleteBankAccount"
      @close="showDeleteBankAccount=false"
      @deleted="fetchBankAccounts()"
    />
    <v-layout row wrap>
      <v-flex xs12 md12 text-md-center>
        <h1>ข้อมูลสมาชิก</h1>
      </v-flex>
      <v-flex xs12 md2>
        <v-text-field outlined label="รหัสสมาชิก" v-model="member.id" disabled></v-text-field>
      </v-flex>
      <v-flex xs12 md10>
        <v-text-field outlined label="ชื่อ - สกุล" v-model="member.name"></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field outlined label="เลขบัตรประชาชน" v-model="member.citizenId"></v-text-field>
      </v-flex>
      <v-flex xs12 md6>
        <v-text-field outlined label="เบอร์โทรศัพท์" v-model="member.phoneNumber"></v-text-field>
      </v-flex>
      <v-flex xs12 md12>
        <v-text-field outlined label="ที่อยู่" textarea v-model="member.address"></v-text-field>
      </v-flex>
    </v-layout>
    <hr />
    <v-layout row wrap mb-5>
      <v-flex xs12 md12 text-md-center>
        <h1>ข้อมูลสมุดบัญชี</h1>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-card hover light height="100%">
          <v-card-title primary-title>เพิ่มข้อมูลสมุดบัญชี</v-card-title>
          <v-card-text>
            <p>- สาขา</p>
            <p>- หมายเลขบัญชี</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined @click="showAddBankAccount=true">
              <v-icon x-large color="success">mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3 v-for="acc in bankAccounts" :key="acc.id">
        <v-card hover light>
          <v-card-title primary-title>{{acc.provider}}</v-card-title>
          <v-card-text>
            <p>{{acc.campus}}</p>
            <p>{{acc.number}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" @click="toEditPage(acc.id)" outlined>แก้ไข</v-btn>
            <v-btn color="error" @click="selectDeleteBankAccount(acc)" outlined>ลบ</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
    <hr />
    <v-layout row wrap mb-5>
      <v-flex xs12 md12 text-md-center>
        <h1>ข้อมูลสัญญา/ดราฟ</h1>
      </v-flex>
      <v-flex xs12 sm6 md3 v-for="p in purchases" :key="p.id">
        <v-card light hover>
          <v-card-title primary-title>{{p.type}}</v-card-title>
          <v-card-text>
            <p>{{p.name}}</p>
            <p>จำนวน: {{p.amount}}</p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <hr />
    <v-layout row wrap text-md-right text-right text-sm-right mt-8>
      <v-flex xs12 md12>
        <v-btn style="margin-right: 5px" color="success" @click="save()">แก้ไข</v-btn>
        <v-btn color="error" @click="back()">กลับ</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Member } from "../../models/Member";
import { memberService } from "../../services/member.service";
import { bankAccountService } from "../../services/bankAccount.service";
import AddBankAccount from "../bankAccounts/AddBankAccount.vue";
import DeleteBankAccount from "../bankAccounts/DeleteBankAccount.vue";
import { BankAccount } from "../../models/BankAcount";
import { Purchase } from "../../models/Purchase";
import { purchaseService } from "../../services/purchase.service";

@Component({
  components: {
    AddBankAccount,
    DeleteBankAccount
  }
})
export default class EditMember extends Vue {
  private member: Member = {
    id: "",
    citizenId: "",
    name: "",
    phoneNumber: "",
    createAt: new Date(),
    address: ""
  };
  private firstname: string = "";
  private lastname: string = "";
  private bankAccounts: any = null;
  private showAddBankAccount: boolean = false;
  private showDeleteBankAccount: boolean = false;
  private selectedDeleteBankAccount: BankAccount = {
    id: undefined,
    number: "",
    campus: "",
    provider: "",
    memberId: ""
  };
  private purchases: Purchase[] = [];

  async mounted() {
    this.$store.commit(`setLoading`, true);
    await this.fetchMembers();
    await Promise.all([this.fetchPurcases(), this.fetchBankAccounts()]);
    this.$store.commit(`setLoading`, false);
    console.log(this.member.name);
  }

  private async fetchPurcases() {
    this.purchases = await purchaseService.getByMemberId(<string>(
      this.member.id
    ));
  }

  private async fetchMembers() {
    this.member = await memberService.getById(this.$route.params.id);
    this.firstname = this.member.name.split(` `)[0];
    this.lastname = this.member.name.split(` `)[1];
    this.$store.commit(`setCurrentMember`, this.member);
  }

  private async fetchBankAccounts() {
    this.bankAccounts = await bankAccountService.getByMemberId(<string>(
      this.member.id
    ));
  }

  private selectDeleteBankAccount(bankAccount: BankAccount) {
    this.selectedDeleteBankAccount = bankAccount;
    this.showDeleteBankAccount = true;
  }

  private toEditPage(id: string) {
    this.$router.push(`/bankAccount/${id}`);
  }

  private back() {
    this.$router.back();
  }

  private async save() {
    this.$store.commit(`setLoading`, true);
    this.member.name = this.fullname;
    const updated = await memberService.update(this.member);
    this.fetchMembers();
    this.$store.commit(`setLoading`, false);
  }

  get fullname() {
    return `${this.firstname} ${this.lastname}`;
  }
}
</script>

<style scoped>
</style>