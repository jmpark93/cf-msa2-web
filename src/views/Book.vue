<template>
  <v-container class="grey lighten-5">

    <v-row>
      <v-text-field
        label="Search"
        single-line
        solo-inverted
        prepend-inner-icon="mdi-book-search-outline"
      ></v-text-field>

      <v-btn class="mx-4 mt-1" fab dark small color="indigo">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-row>
      <v-col v-for="(item, i) in items" :key="i">
        <v-card :color="item.color" dark>
          <div class="d-flex flex-no-wrap justify-space-between"> 
            <div>
              <v-card-title class="headline">
                {{ item.title }}
              </v-card-title>
              <!-- <v-card-title class="headline" v-text="item.title"></v-card-title> -->

              <v-card-subtitle v-text="item.artist"></v-card-subtitle>

              <v-card-text>
                <v-row align="center" class="mx-0">
                  <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                  ></v-rating>

                  <div class="grey--text ml-4">4.5 (413)</div>
                </v-row>
              </v-card-text>

              <v-card-actions>
                <v-btn color="orange" text>
                  Share
                </v-btn>

                <v-btn color="orange" text>
                  Explore
                </v-btn>
              </v-card-actions>
            </div>

            <v-avatar class="ma-3" size="150" tile>
              <v-img :src="item.src"></v-img>
            </v-avatar>
          </div>
        </v-card>
      </v-col>
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

export default {
  name: "Book",

  data: () => ({
    content: "",
    searchedItems: [],
    items: [
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
      {
        color: "#1F7087",
        src: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
        title: "Supermodel",
        artist: "Foster the People",
      },
      {
        color: "#952175",
        src: "https://cdn.vuetifyjs.com/images/cards/halcyon.png",
        title: "Halcyon Days",
        artist: "Ellie Goulding",
      },
    ],
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

    BookService.getInfo().then(
      (response) => {
        this.content = response.data;
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
