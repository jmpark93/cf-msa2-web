<template>
    <div>
        <br> Book 관리 앱을 하나 넣어볼까 ? 
        <br>
        <br> {{ content }}
    </div>

</template>


<script>
import BookService from '../services/book.service';

export default {
  name: "Book",
  
  data: () => ({
      content: ''
  }),

  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },

  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }

    console.log( "User ID : " + this.currentUser.id);

    BookService.getInfo().then(
      response => {
        this.content = response.data;
      },
      error => {
        this.content =
          (error.response && error.response.data) &&
          error.message ||
          error.toString();

        console.log( this.content );
      }
    );
  }
}
</script>