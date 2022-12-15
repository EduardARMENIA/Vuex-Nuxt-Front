<template>
  <div>
    <h4>All Users</h4>
    <div v-for="(todo, key) in users()" :key="key">
      <div class="card">
        <img :src="`${todo.img}`"style="width:100%">
        <div class="container">
          <h4><b>{{ todo.name }}</b></h4>
          <p>{{ todo.email }}</p>
        </div>
        <button @click.prevent="openUser(todo._id)">
          See Profile
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: ['auth'],
  mounted () {
    this.created()
  },
  methods: {
    ...mapGetters({
      users: 'users/users/getUsers'
    }),
    created () {
      this.$store.dispatch('users/users/Users')
    },
    openUser (user) {
      this.$router.push('/User/' + user)
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  border-radius: 5px; /* 5px rounded corners */
  width: 40%
}

/* Add rounded corners to the top left and the top right corner of the image */
img {
  border-radius: 5px 5px 0 0;
}
</style>
