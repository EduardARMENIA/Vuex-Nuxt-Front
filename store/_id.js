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
  async ProfileById ({ commit }, data) {
    const id = data.id
    const response = await this.$axios.$get(`/api/${id}/user`)
    const todos = response
    const responses = await this.$axios.$get(`http://localhost:8000/api/${todos[0].name}/porfile_post`)
    const posts = responses

    for (let i = 0; i < posts.length; i++) {
      const url = `http://localhost:8000/api/${posts[i].img[0]}/post_image`

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
      commit('setUsers', todos)
    }
  },
  async addComment (data) {
    await this.$axios.$post(`/api/${data.id}/comment`, { content: data.content })
    window.location.reload()
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
