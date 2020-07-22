<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>

      <v-list dense>
        <v-list-item v-if="loggedIn" two-line to="/profile">
          <v-list-item-avatar>
            <img v-if="currentUser.imageURL" :src="currentUser.imageURL" />
            <img v-else src="https://msa2-minio.k8s.kpaasta.io/bucket-download/default-profile.png" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title> {{ currentUser.username }} </v-list-item-title>
            <v-list-item-subtitle> {{ currentUser.email }} </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

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

    <v-app-bar app color="blue-grey" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>JMWork's App</v-toolbar-title>

      <v-spacer> </v-spacer>

      <div v-if="!loggedIn">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/register" v-bind="attrs" v-on="on">
              <v-icon> mdi-badge-account-horizontal-outline </v-icon>
            </v-btn>
          </template>
          <span> 등록 </span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon to="/login" v-bind="attrs" v-on="on">
              <v-icon> mdi-login </v-icon>
            </v-btn>
          </template>
          <span> 로그인 </span>
        </v-tooltip>
      </div>

      <div v-else>
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
            <v-btn
              icon
              to="/login"
              v-bind="attrs"
              v-on="on"
              @click.prevent="logOut"
            >
              <v-icon> mdi-logout </v-icon>
            </v-btn>
          </template>
          <span> 로그아웃 </span>
        </v-tooltip>
      </div>
    </v-app-bar>

    <v-content> 
      <v-container fluid>
        <v-row align="start" justify="center">
          <v-col class="text-center">
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    
    <v-footer app color="blue-grey" class="white--text">
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

  created() {
    console.log(process.env);
  },

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }

      return false;
    },

    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },

  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");

      if (this.$router.path !== "/login") {
        this.$router.push("/login").catch(() => {});
      }
    },
  },
};
</script>
