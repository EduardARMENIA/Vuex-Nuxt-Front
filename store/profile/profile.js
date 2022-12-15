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
    const todos = await this.$axios.$get('/api/usersid', {
      headers: {
        Authorization: `${cookieValue}`
      }
    })

    const posts = await this.$axios.$get(`/api/${todos[0].name}/porfile_post`)

    for (let i = 0; i < posts.length; i++) {
      const response = await this.$axios.$get(`/api/${posts[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)

      posts[i].img = (imageObjectURL)
    }
    commit('setPosts', posts)
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].img[0] === undefined) {
        todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
      } else {
        const response = await this.$axios.$get(`/api/${todos[i].img[0]}/profile_image`, { responseType: 'blob' })
        const imageObjectURL = URL.createObjectURL(response)
        todos[i].img = (imageObjectURL)
      }
    }
    commit('setUsers', todos)
  },
  async ChangePassword ({ }, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `${cookieValue}`
    }
    await this.$axios.$post('/api/change-password', { content: data.content }, {
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
