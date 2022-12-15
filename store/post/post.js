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
  async getPosts ({ commit }) {
    const Post = await this.$axios.$get('/api/post')
    for (let i = 0; i < Post.length; i++) {
      const response = await this.$axios.$get(`/api/${Post[i].img[0]}/post_image`, { responseType: 'blob' })
      const imageObjectURL = URL.createObjectURL(response)
      Post[i].img = (imageObjectURL)
    }
    commit('setPost', Post)
  },
  async addPosts ({}, data) {
    const cookieValue = this.$cookiz.get('jwt')
    const formData = new FormData()
    formData.append('image', data.file)
    formData.append('title', data.title)
    formData.append('content', data.content)
    await this.$axios.$post('/api/post_image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${cookieValue}`
        }
      })
  },
  async addComment ({}, data) {
    await this.$axios.$post(`/api/${data.id}/comment`, { content: data.content })
    window.location.reload()
  }
}

export const getters = {
  getUsersNames: (state) => {
    return state.Post
  }
}
