<template>
  <v-dialog v-model="show" persistent max-width="800px">
    <v-card>
      <v-card-title primary-title>เพิ่มสามชิก</v-card-title>
      <v-card-text>
        <v-layout row wrap>
          <v-flex xs12 md2>
            <v-select outlined :items="prefixs" v-model="prefixName" label="คำนำหน้า"></v-select>
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
              outlined
              v-model="firstname"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
              label="ชื่อ"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md5>
            <v-text-field
              outlined
              v-model="lastname"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
              label="สกุล"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              v-model="citizenId"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
              label="หมายเลขบัตรประชาชน"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              outlined
              v-model="phoneNumber"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
              label="เบอร์โทรศัพท์"
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12>
            <v-text-field
              outlined
              v-model="address"
              label="ที่อยู่"
              required
              :rules="[ v => !!v || 'จำเป็นต้องกรอก']"
              textarea
            ></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="createMember()">เพิ่มสมาชิก</v-btn>
        <v-btn color="error" @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="showError" max-width="500px" transition="dialog-transition">
      <v-card>
        <v-card-title primary-title>ไม่สามารถเพิ่มสมาชิกได้</v-card-title>
        <v-card-text>ชื่อหรือเลขบัตรประชาชนซ้ำกับสมาชิกอื่น</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="showError = !showError">ปิด</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { Member } from "../../models/Member";
import { memberService } from "../../services/member.service";

@Component
export default class AddMember extends Vue {
  @Prop()
  private show!: boolean;

  private firstname: string = "";

  private lastname: string = "";

  private prefixName: string = "";

  private citizenId: string = "";

  private phoneNumber: string = "";

  private address: string = "";

  private showError: boolean = false;

  private prefixs: string[] = [`นาย`, `นาง`, `นางสาว`, `เด็กชาย`, `เด็กหญิง`];

  private get name(): string {
    return `${this.prefixName}${this.firstname} ${this.lastname}`;
  }

  private async createMember() {
    this.$store.commit(`setLoading`, true);
    if (await this.ExistedValidate()) {
      this.$store.commit(`setLoading`, false);
      this.showError = true;
    } else {
      const member: Member = Member.register(
        this.citizenId,
        this.name,
        this.phoneNumber,
        this.address
      );
      const newMember = await memberService.create(member);
      this.$store.commit(`setLoading`, false);
      this.memberCreated();
    }
  }

  private async ExistedValidate() {
    const nameExisted = this.members.filter(m => m.name === this.name);
    const citizenIdExisted = this.members.filter(
      m => m.citizenId === this.citizenId
    );
    if (nameExisted.length > 0 || citizenIdExisted.length > 0) {
      return true;
    }
    return false;
  }

  get members(): Member[] {
    return this.$store.state.members;
  }

  private clear() {
    this.firstname = "";
    this.lastname = "";
    this.citizenId = "";
    this.phoneNumber = "";
    this.address = "";
  }

  @Emit(`close`)
  private close() {
    this.clear();
  }

  @Emit(`created`)
  private memberCreated() {
    this.close();
  }
}
</script>

<style scoped>
</style>