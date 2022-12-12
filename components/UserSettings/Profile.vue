 <template>
    <div class="card">
    <h4>User Settings</h4>
  <img  :src="`${img}`"style="width:100%">
  <div class="container">
    <h4><b>{{ name }}</b></h4>
    <p>{{ email }}</p>

         <input type="file" accept="image/*" @change="onChange" />
        <input id="text" type="password"  v-model="content" placeholder="Change Password" name="content" />
        <button @click="password" id = 'send'>Change Password</button>
  </div>
      <h4>Your publications </h4>
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

<style>
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
