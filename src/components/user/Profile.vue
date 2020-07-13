<template>
  <div class="container">

    <v-avatar class="profile" size="150">
      <img v-if="content.imageURL"
        :src="content.imageURL"
        :alt="content.imageURL"
      >
      <img v-else
        src="http://msa2-minio.k8s.kpaasta.io/bucket-download/default-profile.png"
        alt="Default Profile Image"
      />
    </v-avatar>

    <v-subheader> {{ currentUser.username }}'s Profile </v-subheader>
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
            <td class="text-left">아이디</td>
            <td class="text-left">{{ currentUser.id }}</td>
          </tr>
          <tr>
            <td class="text-left">이메일</td>
            <td class="text-left">{{ currentUser.email }}</td>
          </tr>
          <tr>
            <td class="text-left">Token</td>
            <td class="text-left">
              {{ currentUser.accessToken.substring(0, 20) }} ...
              {{
                currentUser.accessToken.substr(
                  currentUser.accessToken.length - 20
                )
              }}
            </td>
          </tr>
          <tr>
            <td class="text-left">권한</td>
            <td class="text-left">
              {{ currentUser.roles }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <v-subheader> {{ currentUser.username }}'s Details </v-subheader>
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
            <td class="text-left">이름</td>
            <td class="text-left">{{ content.fullname }}</td>
          </tr>
          <tr>
            <td class="text-left">이미지</td>
            <td class="text-left">{{ content.imageURL }}</td>
          </tr>          
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import UserService from "@/services/user.service";

export default {
  name: "Profile",

  data: () => ({
    content: "",
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

    UserService.getProfile(this.currentUser.id).then(
      (response) => {
        this.content = response.data;
        console.log(this.content);
      },
      (error) => {
        this.content =
          (error.response && error.response.data && error.message) ||
          error.toString();

        console.log(this.content);
      }
    );
  },
};
</script>
