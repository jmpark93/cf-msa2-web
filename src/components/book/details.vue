<template>
  <v-container>
    <v-form @submit.prevent="handleUpdate" id="register-form">
      <v-row>
        <v-col cols="12" sm="6">
          <v-card align="center">
            <v-card-text>
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
                변경
              </v-btn>
              <v-btn color="info" class="ma-4" to="/book/all">
                취소
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
  name: "book-details",

  props: { id: Number }, 

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

  mounted() {
    this.getBook(this.id);
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

    getBook(id) {
      BookService.getBook(id).then(
        (response) => {
          this.book = response.data;
          this.imageURL = this.book.imageURL;
        },
        (error) => {
          this.successful = false;
          this.message =
            (error.response && error.response.data && error.message) ||
            error.toString();
        }
      );
    },

    handleUpdate() {
      this.book.userID = this.currentUser.id;

      console.log(this.book);

      BookService.updateImage(this.book.id, this.imageFile ).then(
        (response) => {
          this.successful = false;
          this.message = response.data;
        },
        (error) => {
          this.successful = false;
          this.message = this.message 
            (error.response && error.response.data && error.message) ||
            error.toString();
        }
      );

      BookService.updateBook(this.book).then(
        (response) => {
          this.successful = false;
          this.message = this.message + ',' + response.data;
          this.$router.push("/book/all");
        },
        (error) => {
          this.successful = false;
          this.message = this.message + ',' + 
            (error.response && error.response.data && error.message) ||
            error.toString();
        }
      );
    },
  },
};
</script>
