<template>
  <v-card>
    <v-card-title>
      Users
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>

    <v-data-table :headers="headers" :items="users" :search="search">
      <template v-slot:item.roles="{ item }">
        <template v-for="role in item.roles"> {{ role.name }}, </template>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon small @click="openDialog(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="290" >
      <v-card>
        <v-card-title class="headline">사용자 삭제 ... </v-card-title>

        <v-card-text v-if="users[deleteIdx]">
          사용자 "{{
            users[deleteIdx].username + "(" + users[deleteIdx].id + ")"
          }}"를 삭제할까요 ?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="dialog = false">
            NO
          </v-btn>

          <v-btn color="green darken-1" text @click="deleteUser">
            YES
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default {
  name: "Admin",

  data: () => ({
    search: "",
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "User Name", value: "username" },
      { text: "E-Mail", value: "email" },
      { text: "Role", value: "roles" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    users: [],
    dialog: false,
    deleteIdx: 0,
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }

    console.log("User ID : " + this.currentUser.id);

    UserService.getAllUsers().then(
      (response) => {
        this.users = response.data;
      },
      (error) => {
        this.content =
          (error.response && error.response.data && error.message) ||
          error.toString();

        console.log(this.content);
      }
    );
  },

  methods: {
    openDialog(item) {
      this.deleteIdx = this.users.indexOf(item);
      this.dialog = true;
    },

    deleteUser() {
      this.dialog = false;
      console.log("Delete User : " + this.users[this.deleteIdx].username + "(" + this.users[this.deleteIdx].id + ")");

      AuthService.delete( this.users[this.deleteIdx].id ).then(
        (response) => {
          console.log("Delete User : Success");
          console.log(response);
          this.users.splice(this.deleteIdx,1);
        },
        (error) => {
          this.content =
            (error.response && error.response.data && error.message) ||
            error.toString();

          console.log(this.content);
          console.log("Delete User : Failed");
        }
      );
    },
  },
};
</script>
