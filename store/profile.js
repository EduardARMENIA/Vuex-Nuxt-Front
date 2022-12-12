export const state = () => ({
  user: [],
  post: []
})

export const mutations = {
  setUsers (state, user) {
    state.user = user
  },
  setPosts (state, post) {
    state.post = post
  }
}

export const actions = {
  async Profile ({ commit }) {
    const cookieValue = this.$cookiz.get('jwt')
    const response = await this.$axios.$get('/api/userss', {
      headers: {
        Authorization: `${cookieValue}`
      }
    })
    const todos = response
    const responses = await this.$axios.$get(`http://localhost:8000/api/${todos[0].name}/porfile_post`)
    const posts = responses

    for (let i = 0; i < posts.length; i++) {
      const url = `http://localhost:8000/api/${responses[i].img[0]}/post_image`

      const options = {
        method: 'GET'
      }

      const response = await fetch(url, options)
      const imageBlob = await response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)

      posts[i].img = (imageObjectURL)
    }
    commit('setPosts', posts)
    for (let i = 0; i < todos.length; i++) {
      const url = `http://localhost:8000/api/${todos[i].img[0]}/profile_image`
      if (todos[i].img[0] === undefined) {
        todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
      } else {
        const options = {
          method: 'GET'
        }

        const response = await fetch(url, options)
        const imageBlob = await response.blob()
        const imageObjectURL = URL.createObjectURL(imageBlob)
        todos[i].img = (imageObjectURL)
      }
    }
    commit('setUsers', todos)
  },
  async ChangePassword (data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post('http://localhost:8000/api/change-password', { content: data.content }, {
      headers
    })
  }
}

export const getters = {
  getPosts: (state) => {
    return state.post
  },
  getUsers: (state) => {
    return state.user
  }
}
