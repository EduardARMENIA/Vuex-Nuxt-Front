<template>
  <div id="app">
    <div class="main">
      <div v-for="(todo, key) in users()" :key="key">
        <img :src="`${ todo.img}`" height="400" width="400">
        <h6>{{ todo.name }}</h6>
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
      users: 'users/getUsers'
    }),
    created () {
      this.$store.dispatch('users/Users')
    },
    openUser (user) {
      this.$router.push('/User/' + user)
    }
  }
}
</script>
