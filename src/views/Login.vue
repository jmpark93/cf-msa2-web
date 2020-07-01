<template>
  <div>
    <v-card width="400" class="mx-auto mt-5">
      <v-card-title  class="justify-center" >
        <v-avatar color="indigo">
          <v-icon x-large dark>mdi-account-circle</v-icon>
        </v-avatar> 
        <!-- <h1 class="display-1"> Login </h1> -->
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin" id="login-form">
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
        </v-form>
      </v-card-text>
      <v-divider> </v-divider>
      <v-card-actions>
        <v-btn color="success" to=/register> Register </v-btn>
        <v-spacer> </v-spacer>
        <v-btn color="info" :disabled="loading" type="submit" form="login-form"> Login </v-btn>
      </v-card-actions>
      <v-card-text  v-if="message">
        <v-alert dense text type="error" class="text-left"> {{message}} </v-alert>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: "Login",
  
  data: () => ({
    user: new User('', '', ''),
    loading: false,
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
      this.$router.push('/profile');
    }
  },

  methods: {
    handleLogin() {
      this.loading = true;

      if (this.user.username && this.user.password) {

        this.$store.dispatch('auth/login', this.user).then(
          () => {
              this.$router.push('/todo');
          },
          error => {
            this.loading = false;

            this.message = 
              (error.response && error.response.data) &&
              error.response.data.error_description ||
              error.message ||
              error.toString();
          }
        );
      } else {
        this.loading = false;
        this.message = "Username/Password를 입력하세요 ... ";
      }        
    }
  }
}
</script>