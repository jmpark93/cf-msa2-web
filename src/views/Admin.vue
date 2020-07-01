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
    <v-data-table
      :headers="headers"
      :items="users"
      :search="search"
    >
      <template v-slot:item.roles="{ item }"> 
        <template v-for="role in item.roles"> {{ role.name }}, </template>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import UserService from '../services/user.service';

export default {
  name: "Admin",
  
  data: () => ({
    search: '',
    headers: [
      {
        text: 'ID',
        align: 'start',
        sortable: false,
        value: 'id',
      },
      { text: 'User Name', value: 'username' },
      { text: 'E-Mail', value: 'email' },
      { text: 'Role', value: 'roles' }
    ],
    users: []
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    console.log( "User ID : " + this.currentUser.id);

    UserService.getAllUsers().then(
      response => {
        this.users = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) &&
          error.message ||
          error.toString();

        console.log( this.content);
      }
    );
  }
}
</script>