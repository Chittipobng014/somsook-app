<template>
  <v-dialog v-model="show" max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title primary-title>ลบข้อมูลสมาชิก</v-card-title>
      <v-card-text v-if="member">ยืนยันลบข้อมูลสมาชิกของ {{member.name}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="success" @click="deleteMember()">ยืนยัน</v-btn>
        <v-btn color="error" @click="close()">ยกเลิก</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Member } from "../../models/Member";
import { memberService } from "../../services/member.service";

@Component
export default class DeleteMember extends Vue {
  @Prop()
  private member!: Member;

  @Prop()
  private show: boolean = false;

  private async deleteMember() {
    this.$store.commit(`setLoading`, true);
    await memberService.delete(<string>this.member.id);
    this.$store.commit(`setLoading`, false);
    this.memberDeleted();
  }

  @Emit(`close`)
  private close() {}

  @Emit(`deleted`)
  private memberDeleted() {
    this.close();
  }
}
</script>

<style scoped>
</style>