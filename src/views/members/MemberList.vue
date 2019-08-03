<template>
  <v-container grid-list-xs fluid>
    <v-layout row wrap justify-end>
      <v-flex xs12 md4>
        <v-text-field
          outlined
          solo
          append-icon="mdi-magnify"
          v-model="searchText"
          @keyup="search()"
          label="ค้นหา"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <add-member :show="showAddMember" @close="showAddMember = false" @created="fetchMembers()" />
      <delete-member
        :member="selectedDeleteMember"
        :show="showDeleteMember"
        @close="showDeleteMember=false"
        @deleted="fetchMembers()"
      />
      <v-flex md12 xs12 xl12 text-xs-center>
        <v-simple-table dark>
          <thead>
            <tr>
              <th class="table-header">รหัสสมาชิก</th>
              <th class="table-header">ชื่อ - สกุล</th>
              <th class="table-header">โทรศัพท์</th>
              <th class="text-right">
                <v-btn color="success" outlined @click="showAddMember = true">เพิ่มสมาชิก</v-btn>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="member in filteredMembers" :key="member.id">
              <td class="table-text">{{ member.id }}</td>
              <td class="table-text">{{ member.name }}</td>
              <td class="table-text">{{ member.phoneNumber }}</td>
              <td class="text-right">
                <v-btn
                  style="margin-right: 5px"
                  outlined
                  color="warning"
                  @click="toEditPage(member.id)"
                >แก้ไขข้อมูล</v-btn>
                <v-btn outlined color="error" @click="selectDeleteMember(member)">ลบข้อมูล</v-btn>
              </td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AddMember from "./AddMember.vue";
import DeleteMember from "./DeleteMember.vue";
import { Member } from "../../models/Member";
import { memberService } from "../../services/member.service";

@Component({
  components: {
    AddMember,
    DeleteMember
  }
})
export default class MemberList extends Vue {
  private showAddMember: boolean = false;

  private showDeleteMember: boolean = false;

  private members: Member[] = [];

  private selectedDeleteMember: Member | null = null;

  private searchText = "";

  //   get members(): Member {
  //     return this.$store.state.members;
  //   }

  async fetchMembers() {
    this.members = await memberService.getAll();
    this.$store.commit(`setMembers`, this.members);
  }

  async mounted() {
    this.$store.commit(`setLoading`, true);
    await this.fetchMembers();
    this.$store.commit(`setLoading`, false);
  }

  async edit(id: string) {
    console.log(await memberService.getById(id));
  }

  selectDeleteMember(member: Member) {
    this.selectedDeleteMember = member;
    this.showDeleteMember = true;
  }

  toEditPage(id: string) {
    this.$router.push(`/member/${id}`);
  }

  search() {
    console.log(this.searchText);
  }

  get filteredMembers() {
    return this.members.filter(member => {
      return member.name.toLowerCase().includes(this.searchText.toLowerCase());
    });
  }
}
</script>

<style scoped>
.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.table-header {
  font-size: 24px;
}

.table-text {
  font-size: 18px;
}
</style>