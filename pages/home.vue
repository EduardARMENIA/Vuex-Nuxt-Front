<template>
  <div id="app">
    <div class="main">
      <div>
        <post
          v-for="todo in companies()"
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
import { mapGetters } from 'vuex'
import Post from '@/components/Post'
export default {
  components: { Post },
  middleware: ['auth'],
  mounted () {
    this.created()
  },
  methods: {
    ...mapGetters({
      companies: 'post/getUsersNames'
    }),
    created () {
      this.$store.dispatch('post/getPosts')
    },
    submitForm (id, content) {
      this.$store.dispatch('post/addComment', { id, content })
    }
  }
}
</script>
