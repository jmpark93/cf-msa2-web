<template>
  <v-container>
    <v-row>
      <v-col v-show="showListCol">
        <v-card>
          <v-card-text>
            <v-text-area
              v-model="task"
              label="제목"
              multi-line
              prepend-icon="mdi-book-open-variant"
            />
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-btn @click="showDetails()"> 목록 선택 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col v-show="showItemCol">
        <v-card>
          <v-card-text>
            <v-text-area
              v-model="task"
              label="제목"
              multi-line
              prepend-icon="mdi-book-open-variant"
            />
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-btn @click="hideDetails()"> 가리기 </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "todo-details",

  data: () => ({
    id: "",
    task: "",
    isMobile: false,

    itemSelected: false,

    showListCol: true,
    showItemCol: false,
  }),

  mounted() {
    this.id = this.$route.params.id;

    this.onResize();
    window.addEventListener("resize", this.onResize, { passive: true });
  },

  methods: {
    onResize() {
      this.isMobile = window.innerWidth < 600;
    },

    showDetails() {
      if (this.isMobile) {
        this.showListCol = false;
        this.showItemCol = true;
      } else {
        this.showListCol = true;
        this.showItemCol = true;
      }
    },

    hideDetails() {
      this.showListCol = true;
      this.showItemCol = false;
    },
  },
};
</script>
