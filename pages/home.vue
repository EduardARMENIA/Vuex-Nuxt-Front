<template>
  <div id="app">
    <div class="main">
      <div>
        <post
          v-for="todo in todos"
          :id="todo._id"
          :key="todo.id"
          :author="todo.author"
          :description="todo.content"
          :title="todo.title"
          :comments="todo.comments"
          :img="todo.img"
          @success="submitForm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post'
export default {
  components: { Post },
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
        const response = await this.$axios.$get('/api/post')
        this.todos = response
        for (let i = 0; i < this.todos.length; i++) {
          const url = `http://localhost:8000/api/${this.todos[i].img[0]}/post_image`
          const options = {
            method: 'GET'
          }
          const response = await fetch(url, options)
          const imageBlob = await response.blob()
          const imageObjectURL = URL.createObjectURL(imageBlob)
          this.todos[i].img = (imageObjectURL)
        }
      } catch (e) {
        return (e)
      }
    },
    async submitForm (id, content) {
      await this.$axios.$post(`/api/${id}/comment`, { content })
      window.location.reload()
    }
  }
}
</script>
