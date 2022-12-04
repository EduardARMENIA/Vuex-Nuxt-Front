<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Nuxt Social Media</a>

    <div class="collapse navbar-collapse">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <nuxt-link exact no-prefetch active-class="active"  v-if="hasToken" class="nav-link" to="/home">
            Home
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active"  v-if="hasToken" class="nav-link" to="/about">
            About
          </nuxt-link>
        </li>
         <li class="nav-item">
          <nuxt-link active-class="active"  v-if="hasToken" class="nav-link" to="/add">
            Add Post
          </nuxt-link>
        </li>
        <li class="nav-item">
          <nuxt-link active-class="active"  v-if="hasToken" class="nav-link" to="/profile">
            Profile
          </nuxt-link>
        </li>
         <li class="nav-item">
          <nuxt-link active-class="active"  v-if="hasToken" class="nav-link" to="/users">
            Users
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="!hasToken">
          <nuxt-link active-class="active" class="nav-link" to="/">
            Login
          </nuxt-link>
        </li>
        <li class="nav-item" v-if="!hasToken">
          <nuxt-link active-class="active" class="nav-link" to="/register">
            Register
          </nuxt-link>
        </li>
        <li class="nav-item" v-else>
          <a @click.prevent="logout" class="nav-link" href="#">
            Logout
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>



<script>
import {useStore} from "vuex";
export default {
  computed: {
    hasToken() {
      return this.$store.getters.hasToken
    }
  },
  methods: {
    logout() {
       document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      this.$store.dispatch('logout')
      this.$router.push('/')
    }
  }
}
</script>