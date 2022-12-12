<template>
  <div>
    <div>
      <Profile
        v-for="todo in users()"
        :id="todo.id"
        :key="todo.id"
        :name="todo.name"
        :img="todo.img"
        :email="todo.email"
      />
    </div>
    <div>
      <UserPost
        v-for="post in posts()"
        :id="post._id"
        :key="post.id"
        s
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
import { mapGetters } from 'vuex'
import Profile from '@/components/UserSettings/Profile'
import UserPost from '@/components/UserSettings/UserPost'
export default {
  components: { UserPost, Profile },
  middleware: ['auth'],
  data () {
    return {
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
    ...mapGetters({
      posts: 'profile/getPosts',
      users: 'profile/getUsers'
    }),
    created () {
      this.$store.dispatch('profile/Profile')
    },

    submitForm (id, content) {
      this.$store.dispatch('post/addComment', { id, content })
    },

    password () {
      this.$store.dispatch('profile/ChangePassword', { content: this.content })
    }

  }
}
</script>
