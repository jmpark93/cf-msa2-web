<template>
  <div class="container">

    <v-subheader> {{currentUser.username}}'s Profile </v-subheader>
    <v-divider> </v-divider>

    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Key</th>
            <th class="text-left">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left"> Token </td>
            <td class="text-left"> {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}} </td>
          </tr>
          <tr>
            <td class="text-left"> Id </td>
            <td class="text-left"> {{currentUser.id}} </td>
          </tr>
          <tr>
            <td class="text-left"> Email </td>
            <td class="text-left"> {{currentUser.email}} </td>
          </tr>
          <tr>
            <td class="text-left">Authorities</td>
            <td class="text-left">
              xxx</td>
          </tr>                        
        </tbody>
      </template>
    </v-simple-table>


    <v-subheader> {{currentUser.username}}'s Details  </v-subheader>
    <v-divider> </v-divider>

    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Key</th>
            <th class="text-left">Values</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="text-left"> 미정 </td>
            <td class="text-left"> {{ content }} </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>

</template>

<script>
import UserDetail from '../models/user.details';
import UserService from '../services/user.service';

export default {
  name: 'Profile',

  data: () => ({
    userDetail: new UserDetail(''),
    content: ''
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

    UserService.getProfile(this.currentUser.id).then(
      response => {
        this.content = response.data;
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
};
</script>