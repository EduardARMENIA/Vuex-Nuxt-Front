export const state = () => ({
  Post: []

})

export const mutations = {
  setPost (state, Post) {
    state.Post = Post
  },
  clearPost (state) {
    state.Post = null
  }
}

export const actions = {
  async getPosts ({ commit, getters, dispatch }) {
    const response = await this.$axios.$get('/api/post')
    const Post = response
    for (let i = 0; i < Post.length; i++) {
      const url = `http://localhost:8000/api/${Post[i].img[0]}/post_image`
      const options = {
        method: 'GET'
      }
      const response = await fetch(url, options)
      const imageBlob = await response.blob()
      const imageObjectURL = URL.createObjectURL(imageBlob)
      Post[i].img = (imageObjectURL)
    }
    commit('setPost', Post)
  },
  async addPosts ({ commit, getters, dispatch }, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const formData = new FormData()
    formData.append('image', data.file)
    formData.append('title', data.title)
    formData.append('content', data.content)
    this.$axios.$post('/api/post_image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${cookieValue}`
        }
      })
  },
  async addComment ({ commit }, data) {
    await this.$axios.$post(`/api/${data.id}/comment`, { content: data.content })
    window.location.reload()
  }
}

export const getters = {
  getUsersNames: (state) => {
    return state.Post
  }
}
