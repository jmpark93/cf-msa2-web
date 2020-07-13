<template>
  <div>
    <v-card v-if="!successful" width="400" class="mx-auto mt-5">

      <v-card-title class="justify-center">
        <v-avatar class="profile" size="150">
          <img
            :ref="'imageFile'"
            src="http://msa2-minio.k8s.kpaasta.io/bucket-download/default-profile.png"
            alt="Default Profile Image"
          />
        </v-avatar>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="handleRegister" id="register-form">

          <v-subheader> 필수 항목 </v-subheader>
          <v-divider />

          <v-text-field
            v-model="user.username"
            label="아이디"
            prepend-icon="mdi-account-circle"
          />
          <v-text-field
            v-model="user.password"
            :type="showPassword ? 'txt' : 'password'"
            label="비밀번호"
            prepend-icon="mdi-lock"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="user.email"
            label="이메일"
            prepend-icon="mdi-email"
          />

          <v-subheader> 선택 항목 </v-subheader>
          <v-divider />

          <v-text-field
            v-model="user.fullname"
            label="이름"
            prepend-icon="mdi-email"
          />
          <v-file-input
            prepend-icon="mdi-camera"
            accept="image/*"
            label="프로파일 이미지"
            @change="onFileChange"
          >
          </v-file-input>
        </v-form>
      </v-card-text>

      <v-divider> </v-divider>

      <v-card-actions>
        <v-spacer> </v-spacer>
        <v-btn color="info" type="submit" form="register-form"> 등록 </v-btn>
      </v-card-actions>

      <v-card-text v-if="message">
        <v-alert dense text type="error" class="text-left">
          {{ message }}
        </v-alert>
      </v-card-text>

    </v-card>

    <v-card v-else width="400" class="mx-auto mt-5">

      <v-card-title class="justify-center">
        <v-avatar color="indigo">
          <v-icon x-large dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-card-title>

      <v-card-text v-if="message">
        <v-alert dense text type="success" class="text-left">
          {{ message }}
        </v-alert>
      </v-card-text>

    </v-card>
  </div>
</template>

<script>
import User from "@/models/user";

export default {
  name: "Register",

  data: () => ({
    user: new User(),
    imageFile: "",
    successful: false,
    message: "",
    showPassword: false,
  }),

  computed: {
    loggedin() {
      return this.$store.state.auth.status.loggedin;
    },
  },

  created() {
    if (this.loggedin) {
      console.log("move to profile ... ");
      this.$router.push("/profile");
    }
  },

  methods: {
    onFileChange(file) {
      const fr = new FileReader();

      if (file) {
        fr.onloadend = (e) => {
          let fileData = fr.result;
          this.$refs.imageFile.src = fileData;
          this.$refs.imageFile.alt = file.name;
        };
        fr.readAsDataURL(file);
        this.imageFile = file;
      } else {
        this.$refs.imageFile.src =
          "http://msa2-minio.k8s.kpaasta.io/bucket-download/default-profile.png";
        this.$refs.imageFile.alt = "Default Profile Image";
        this.imageFile = "";
      }
    },

    handleRegister() {
      this.submitted = true;

      if (this.user.username && this.user.password && this.user.email) {
        this.$store
          .dispatch("auth/register", {
            user: this.user,
            imageFile: this.imageFile,
          })
          .then(
            (data) => {
              console.log(data);
              this.message = data.message;
              this.successful = true;
            },
            (error) => {
              this.message =
                (error.response &&
                  error.response.data &&
                  error.response.data.message) ||
                error.message ||
                error.toString();

              this.successful = false;
            }
          );
      } else {
        this.successful = false;
        this.message = "Username, Password, Email 모두 입력하세요.";
      }
    },
  },
};
</script>
