<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>

        <v-list-item to="/">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item v-if="currentUser" to="/todo">
          <v-list-item-action>
            <v-icon>mdi-clipboard-list</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Todo 앱</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="currentUser" to="/book">
          <v-list-item-action>
            <v-icon>mdi-book-open-variant</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Book 앱</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="showAdminBoard" to="/admin">
          <v-list-item-action>
            <v-icon>mdi-hammer-screwdriver</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Admin Contents</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="currentUser" to="/profile">
          <v-list-item-action>
            <v-icon> mdi-badge-account-horizontal </v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title> Profile </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list-item to="/about">
          <v-list-item-action>
            <v-icon>mdi-email</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>About</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="blue-grey"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>JMWork's App</v-toolbar-title>

      <v-spacer> </v-spacer>

      <div v-if="!loggedIn"> 
        <v-tooltip bottom> 
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/register"  v-bind="attrs" v-on="on">
              <v-icon> mdi-badge-account-horizontal-outline </v-icon>
            </v-btn>
          </template>
          <span> 등록 </span>
        </v-tooltip>

        <v-tooltip bottom> 
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/login"  v-bind="attrs" v-on="on">
              <v-icon> mdi-login </v-icon>
            </v-btn>
          </template>
          <span> 로그인 </span>
        </v-tooltip>
      </div>

      <div v-else> 
        {{ currentUser.username }}
        <v-tooltip bottom> 
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/profile" v-bind="attrs" v-on="on">
              <v-icon> mdi-badge-account-horizontal </v-icon>
            </v-btn>
          </template>
          <span> 프로파일 </span>
        </v-tooltip>

        <v-tooltip bottom> 
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/login"  v-bind="attrs" v-on="on" @click.prevent="logOut">
              <v-icon> mdi-logout </v-icon>
            </v-btn>
          </template>
          <span> 로그아웃 </span>
        </v-tooltip>
      </div>

    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <router-view></router-view>
          </v-col>
          
        </v-row>
      </v-container>
    </v-content>
    <v-footer
      app
      color="blue-grey"
      class="white--text"
    >
      <span>Vuetify</span>
      <v-spacer></v-spacer>
      <span>&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  // props: {
  //   source: String,
  // },
  data: () => ({
    drawer: null,
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes('ROLE_ADMIN');
      }

      return false;
    }, 

    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    } 
  },  

methods: {
    logOut() {
      this.$store.dispatch('auth/logout');

      if( this.$router.path !== '/login') {
        this.$router.push('/login').catch(() => {});;
      }
    }
  }  
}
</script>