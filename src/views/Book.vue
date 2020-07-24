<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        solo-inverted
        prepend-inner-icon="mdi-book-search-outline"
      ></v-text-field>

      <v-btn class="mx-4 mt-1" to="/addbook" fab dark small color="indigo">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col v-for="(item, i) in searchedItems" :key="i">
        <v-card :color="colors[i % 5]" dark>
          <div class="d-flex flex-no-wrap justify-space-between">
            <div>
              <v-card-title class="headline">
                {{ item.title }}
              </v-card-title>
              <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->
              <v-card-subtitle align="left">
                {{ item.status }} <br />
                (PUB: {{ item.publishDate }})
              </v-card-subtitle>

              <v-card-text align="left">
                진행 : {{ item.currentPage }} / {{ item.totalPage }} (
                {{
                  Number((item.currentPage / item.totalPage) * 100).toFixed(0)
                }}
                % ) <br />
                경과 :
                {{
                  $moment.utc(item.purchaseDate).local() | moment("from", "now")
                }}
                <!-- <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">4.5 (413)</div>
                </v-row> -->
              </v-card-text>

              <v-card-actions>
                <v-btn icon :to="'/book/' + item.id">
                  <v-icon color="white"> mdi-square-edit-outline </v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="white"> mdi-message-reply-text </v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon color="white" @click="removeBook(item)">
                    mdi-delete-forever
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="mt-5" size="130" tile>
              <v-img
                contain
                :src="item.imageURL ? item.imageURL : defaultImage"
              ></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      {{ message }}
    </v-row>
  </v-container>
</template>

<script>
import BookService from "../services/book.service";

// cololr :
//  purple lighten-3
//  teal lighten-3
//  red lighten-3
//  yellow lighten-3
//  green lighten-3
//  grey lighten-3
// #952175, #1F7087

export default {
  name: "Book",

  data: () => ({
    defaultImage:
      "https://msa2-minio.k8s.kpaasta.io/msa2-book/default-book.png",

    search: '',
    items: [],
    colors: [
      "red lighten-1",
      "purple lighten-1",
      "green lighten-1",
      "#952175",
      "#1F7087",
    ],
    message: "",
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },

    searchedItems() {
      return this.items.filter( 
        item => {
          return item.title.toLowerCase().includes(this.search.toLowerCase());
        }
      );
    }

  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push("/login");
    }

    console.log("User ID : " + this.currentUser.id);

    BookService.getAllByUserId(this.currentUser.id).then(
      (response) => {
        this.items = response.data._embedded.books;
        // this.searchedItems = this.items;

        console.log(response.data);
      },
      (error) => {
        this.message =
          (error.response && error.response.data && error.message) ||
          error.toString();
      }
    );
  },

  methods: {
    removeBook(bookItem) {
      console.log("Book (" + bookItem.id + ") : " + bookItem.title);

      BookService.removeBook(bookItem.id).then(
        (response) => {
          const index = this.items.findIndex((book) => {
            return book.id === bookItem.id;
          });

          this.items.splice(index, 1);
        },
        (error) => {
          this.message =
            (error.response && error.response.data && error.message) ||
            error.toString();
        }
      );
    },
  },
};
</script>
