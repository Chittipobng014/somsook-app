<template>
  <v-container grid-list-xs fluid>
    <add-purchase
      :show="showAddPurchase"
      @close="showAddPurchase=false"
      @created="fetchBankAccount()"
    />
    <delete-purchase
      :show="showDeletePurchase"
      :purchase="selectedDeletePurchase"
      @close="showDeletePurchase=false"
      @deleted="fetchBankAccount()"
    />
    <v-layout row wrap text-md-center>
      <v-flex xs12 md12>
        <h1>แก้ไขสมุดบัญชี</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-text-field outlined label="ธนาคาร" v-model="bankAccount.provider"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field outlined label="สาขา" v-model="bankAccount.campus"></v-text-field>
      </v-flex>
      <v-flex xs12 md4>
        <v-text-field outlined label="หมายเลขบัญชี" v-model="bankAccount.number"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 md12>
        <hr />
      </v-flex>
    </v-layout>

    <v-layout row wrap text-md-center mt-8>
      <v-flex xs12 md12>
        <h1>แก้ไขดราฟ/สัญญา</h1>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 md4>
        <v-card height="100%">
          <v-card-title primary-title>เพิ่มสัญญา / ดราฟ</v-card-title>
          <v-card-text>
            <p>- สัญญา</p>
            <p>- ดราฟ</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" outlined @click="showAddPurchase=true">
              <v-icon x-large color="success">mdi-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs12 md4 v-for="p in purchases" :key="p.id">
        <v-card>
          <v-card-title primary-title>{{p.type}}</v-card-title>
          <v-card-text>
            <p>ชื่อ: {{p.name}}</p>
            <p>จำนวนเงิน: {{p.amount}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="warning" outlined>แก้ไข</v-btn>
            <v-btn color="error" outlined @click="deletePurchase(p)">ลบ</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap text-md-right text-xs-right mt-8>
      <v-flex xs12 md12>
        <v-btn style="margin-right: 5px" color="success" @click="save()">แก้ไข</v-btn>
        <v-btn color="error" @click="back()">กลับ</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { BankAccount } from "../../models/BankAcount";
import { bankAccountService } from "../../services/bankAccount.service";
import { Purchase } from "../../models/Purchase";
import { purchaseService } from "../../services/purchase.service";
import AddPurchase from "../purchases/AddPurchase.vue";
import DeletePurchase from "../purchases/DeletePurchase.vue";

@Component({
  components: {
    AddPurchase,
    DeletePurchase
  }
})
export default class EditBankAccount extends Vue {
  private bankAccount: BankAccount = {
    id: undefined,
    number: "",
    campus: "",
    provider: "",
    memberId: ""
  };
  private purchases: Purchase[] = [];
  private showAddPurchase: boolean = false;
  private showDeletePurchase: boolean = false;
  private selectedDeletePurchase: Purchase = {
    id: undefined,
    type: `ดราฟ` || `สัญญา`,
    name: "",
    amount: "",
    bankAccountId: "",
    memberId: ""
  };

  async fetchBankAccount() {
    this.$store.commit(`setLoading`, true);
    this.bankAccount = await bankAccountService.getById(this.$route.params.id);
    await this.fetchPurchases();
    this.$store.commit(`setCurrentBankAccount`, this.bankAccount);
    this.$store.commit(`setLoading`, false);
  }

  async fetchPurchases() {
    this.purchases = await purchaseService.getByBankAccountId(<string>(
      this.bankAccount.id
    ));
  }

  back() {
    this.$router.back();
  }

  async save() {
    this.$store.commit(`setLoading`, true);
    const updated = await bankAccountService.update(this.bankAccount);
    await this.fetchBankAccount();
    this.$store.commit(`setLoading`, false);
  }

  deletePurchase(purchase: Purchase) {
    this.selectedDeletePurchase = purchase;
    this.showDeletePurchase = true;
  }

  async mounted() {
    await this.fetchBankAccount();
  }

  @Emit(`close`)
  close() {}
}
</script>

<style scoped>
</style>