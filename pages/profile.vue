<template>
  <div>
    <div>
      <Profile
        v-for="todo in todos"
        :id="todo.id"
        :key="todo.id"
        :name="todo.name"
        :img="todo.img"
        :email="todo.email"
      />
    </div>
    <div>
      <UserPost
        v-for="post in posts"
        :id="post._id"
        :key="post.id"
        :author="post.author"
        :description="post.content"
        :title="post.title"
        :comments="post.comments"
        :img="post.img"
        @success="submitForm"
      />
    </div>
  </div>
</template>
<script>
import Profile from '@/components/UserSettings/Profile'
import UserPost from '@/components/UserSettings/UserPost'
export default {
  components: { UserPost, Profile },
  middleware: ['auth'],
  data () {
    return {
      todos: [],
      posts: [],
      item: {
        image: null,
        imageUrl: null
      },
      content: '',
      img: ''
    }
  },

  mounted () {
    this.created()
  },
  methods: {

    async created () {
      try {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1]
        const response = await this.$axios.$get('/api/userss', {
          headers: {
            Authorization: `${cookieValue}`
          }
        })
        this.todos = response
        const responses = await this.$axios.$get(`http://localhost:8000/api/${this.todos[0].name}/porfile_post`)
        this.posts = responses

        for (let i = 0; i < this.posts.length; i++) {
          const url = `http://localhost:8000/api/${responses[i].img[0]}/post_image`

          const options = {
            method: 'GET'
          }

          const response = await fetch(url, options)
          const imageBlob = await response.blob()
          const imageObjectURL = URL.createObjectURL(imageBlob)

          this.posts[i].img = (imageObjectURL)
        }
        for (let i = 0; i < this.todos.length; i++) {
          const url = `http://localhost:8000/api/${this.todos[i].img[0]}/profile_image`
          if (this.todos[i].img[0] === undefined) {
            this.todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
          } else {
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
    async submitForm (id, content) {
      await this.$axios.$post(`/api/${id}/comment`, { content })
      window.location.reload()
    },

    password () {
      const cookieValue = document.cookie.split('; ').find(row => row.startsWith('jwt=')).split('=')[1]
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `${cookieValue}`
      }
      this.$axios.$post('http://localhost:8000/api/change-password', { content: this.content }, {
        headers
      })
    }

  }
}
</script>
