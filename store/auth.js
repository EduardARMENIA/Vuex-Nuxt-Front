export const state = () => ({
  token: null

})

export const mutations = {
  setToken (state, token) {
    state.token = token
  },
  clearToken (state) {
    state.token = null
  }
}

export const actions = {
  async login ({ commit }, data) {
    console.log(data.password)
    const post = await this.$axios.$post('http://localhost:8000/api/login', { email: data.email, password: data.password })
    if (post.message === 'success') {
      this.$cookiz.set('jwt', post.token)
      commit('setToken', 'truetoken')
      this.$router.push('/home')
    }
  },
  async register ({ commit },data) {
    const post = await this.$axios.$post('/api/register', { name: data.name, email: data.email, password: data.password })
    if (post.message === 'success') {
      this.$router.push('/')
    }
  },
  logout ({ commit }) {
    commit('clearToken')
  }
}

export const getters = {
  hasToken: s => !!s.token
}
