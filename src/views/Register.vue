<template>
  <div>

    <v-card v-if="!successful" width="400" class="mx-auto mt-5">
      <v-card-title  class="justify-center" >
        <h1 class="display-1"> 사용자 등록 </h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister" id="register-form">
          <v-text-field
            v-model="user.username"
            label="Username"
            prepend-icon="mdi-account-circle" 
          />
          <v-text-field
            v-model="user.password"
            :type="showPassword ? 'txt' : 'password'"
            label="Password" 
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="user.email"
            label="Email"
            prepend-icon="mdi-email" 
          />          
        </v-form>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="info" type="submit" form="register-form"> Register </v-btn>
      </v-card-actions>
      <v-card-text  v-if="message">
        <v-alert dense text type="error" class="text-left"> {{message}} </v-alert>
      </v-card-text>      
    </v-card>

    <v-card v-else width="400" class="mx-auto mt-5">
      <v-card-title  class="justify-center" >
        <v-avatar color="indigo">
          <v-icon x-large dark>mdi-account-circle</v-icon>
        </v-avatar> 
      </v-card-title>
      <v-card-text  v-if="message">
        <v-alert dense text type="success" class="text-left"> {{message}} </v-alert>
      </v-card-text>
    </v-card>

  </div>
</template>


<script>
import User from '../models/user';

export default {
  name: 'Register',

  data: () => ({
    user: new User('', '', ''),
    successful: false,
    message: '',
    showPassword: false
  }),

  computed: {
    loggedin() {
      return this.$store.state.auth.status.loggedin;
    }
  },

  created() {
    if( this.loggedin ) {
      console.log( "move to profile ... ")
      this.$router.push('/profile');
    }
  },

  methods: {
    handleRegister() {
      this.submitted  = true;

      console.log( "Register ... ")
      if (this.user.username && this.user.password && this.user.email) {

        this.$store.dispatch('auth/register', this.user).then(
          data => {
              console.log( data)
              this.message = data.message;
              this.successful = true
          },
          error => {

            this.message = 
              (error.response && error.response.data) &&
              error.response.data.message ||
              error.message ||
              error.toString();
            
            this.successful = false;
          }
        );
      } else {
        this.successful = false;
        this.message = "Username, Password, Email 모두 입력하세요.";
      }        
    }
  }
}
</script>