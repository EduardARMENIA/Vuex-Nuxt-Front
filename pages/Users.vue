<template>
  <div id="app">
    <div class="main">
      <div v-for="(todo, key) in todos" :key="key">
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
export default {
  middleware: ['auth'],
  data () {
    return {
      todos: []
    }
  },
  mounted () {
    this.created()
  },
  methods: {

    async created () {
      try {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1]
        const response = await fetch('http://localhost:8000/api/users-name', {
          headers: { 'Content-Type': 'application/json', Authorization: `${cookieValue}` },
          credentials: 'include'
        })
        const content = await response.json()
        const x = JSON.stringify(content)
        const mydata = JSON.parse(x)
        this.todos = mydata

        for (let i = 0; i < this.todos.length; i++) {
          if (this.todos[i].img[0] === undefined) {
            this.todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
          } else {
            const url = `http://localhost:8000/api/${mydata[i].img[0]}/profile_image`

            const options = {
              method: 'GET'
            }

            const response = await fetch(url, options)
            const imageBlob = await response.blob()
            const imageObjectURL = URL.createObjectURL(imageBlob)
            this.todos[i].img = (imageObjectURL)
          }
        }
      } catch (e) {
        return (e)
      }
    },
    openUser (user) {
      this.$router.push('/User/' + user)
    }
  }
}
</script>
