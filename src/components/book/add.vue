<template>
  <v-container>
    <v-form @submit.prevent="handleRegister" id="register-form">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card align="center">
            <!-- <v-card-title> </v-card-title> -->
            <v-card-text>
              <!-- src="http://image.yes24.com/goods/89309569/800x0" -->
              <!-- ref="imageFile" -->
              <v-img
                class="mb-9"
                :src="imageURL"
                aspect-ratio="1"
                max-height="500"
                contain
              >
              </v-img>

              <v-divider />

              <v-file-input
                prepend-icon="mdi-camera"
                accept="image/*"
                label="책 이미지"
                @change="onFileChange"
                class="mx-5"
              >
              </v-file-input>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" sm="6">
          <v-card align="center">
            <!-- <v-card-title> </v-card-title> -->
            <v-card-text>
              <v-subheader> 필수 항목 </v-subheader>
              <v-divider />

              <v-text-field
                v-model="book.title"
                label="제목"
                prepend-icon="mdi-book-open-variant"
              />

              <v-menu
                ref="purchaseDateMenu"
                v-model="purchaseDateMenu"
                :close-on-content-click="false"
                :return-value.sync="book.purchaseDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="book.purchaseDate"
                    label="구매일"
                    prepend-icon="mdi-calendar-today"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="book.purchaseDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="purchaseDateMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.purchaseDateMenu.save(book.purchaseDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-text-field
                v-model="book.totalPage"
                label="총 페이지수"
                prepend-icon="mdi-book-information-variant"
              />
              <v-subheader> 선택 항목 </v-subheader>
              <v-divider />

              <v-select
                :items="status"
                label="읽기 상태"
                v-model="book.status"
                prepend-icon="mdi-book-open-variant"
              ></v-select>

              <v-menu
                ref="publishDateMenu"
                v-model="publishDateMenu"
                :close-on-content-click="false"
                :return-value.sync="book.publishDate"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="book.publishDate"
                    label="출판일"
                    prepend-icon="mdi-calendar-today"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="book.publishDate" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="publishDateMenu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.publishDateMenu.save(book.publishDate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-container class="ma-0 pa-0">
                <v-row no-gutters>
                  <v-col>
                    <v-text-field
                      v-model="book.currentPage"
                      label="마지막 읽은 곳"
                      prepend-icon="mdi-book-information-variant"
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-model="book.totalPage"
                      label="총 페이지수"
                      prepend-icon="mdi-slash-forward"
                      readonly
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer> </v-spacer>
              <v-btn
                color="info"
                type="submit"
                class="ma-4"
                form="register-form"
              >
                등록
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row v-if="!successful">
        {{ this.message }}
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
import Book from "@/models/book";
import BookService from "@/services/book.service";

export default {
  name: "book-new",

  data: () => ({
    book: new Book(),

    purchaseDateMenu: false,
    publishDateMenu: false,

    imageURL: "https://msa2-minio.k8s.kpaasta.io/msa2-book/default-book.png",
    imageFile: "",

    status: [
      { text: "읽기 시작 안함", value: "Not Yet" },
      { text: "읽고 있는 중", value: "Ing ..." },
      { text: "읽기 완료", value: "COMPLETE" },
    ],

    successful: true,
    message: "문제인가요 ?",
  }),

  computed: {
    loggedin() {
      return this.$store.state.auth.status.loggedin;
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },

  methods: {
    onFileChange(file) {
      const fr = new FileReader();

      if (file) {
        fr.onloadend = (e) => {
          let fileData = fr.result;
          this.imageURL = fileData;
          //   this.$refs.imageFile.src = fileData;
          //   this.$refs.imageFile.alt = file.name;
        };
        fr.readAsDataURL(file);
        this.imageFile = file;
      } else {
        this.imageURL =
          "http://msa2-minio.k8s.kpaasta.io/bucket-download/default-profile.png";
        // this.$refs.imageFile.alt = "Default Profile Image";
        this.imageFile = "";
      }
    },

    handleRegister() {
      this.submitted = true;

      console.log("Current User: " + this.currentUser.id);

      console.log("Image File : " + this.imageFile);
      console.log(this.book);

      this.book.userID = this.currentUser.id;

      BookService.addBook(this.book, this.imageFile).then(
        (response) => {
          this.successful = false;
          this.message = response.data;
          this.$router.push("/book");
        },
        (error) => {
          this.successful = false;
          this.message =
            (error.response && error.response.data && error.message) ||
            error.toString();
        }
      );
      //   if (this.user.username && this.user.password && this.user.email) {
      //     this.$store
      //       .dispatch("auth/register", {
      //         user: this.user,
      //         imageFile: this.imageFile,
      //       })
      //       .then(
      //         (data) => {
      //           console.log(data);
      //           this.message = data.message;
      //           this.successful = true;
      //         },
      //         (error) => {
      //           this.message =
      //             (error.response &&
      //               error.response.data &&
      //               error.response.data.message) ||
      //             error.message ||
      //             error.toString();

      //           this.successful = false;
      //         }
      //       );
      //   } else {
      //     this.successful = false;
      //     this.message = "Username, Password, Email 모두 입력하세요.";
      //   }
    },
  },
};
</script>
