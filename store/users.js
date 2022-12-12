export const state = () => ({
  users: []
})

export const mutations = {
  setUsers (state, users) {
    state.users = users
  }
}

export const actions = {
  async Users ({ commit }) {
    try {
      const cookieValue = this.$cookiz.get('jwt')
      const response = await fetch('http://localhost:8000/api/users-name', {
        headers: { 'Content-Type': 'application/json', Authorization: `${cookieValue}` },
        credentials: 'include'
      })
      const content = await response.json()
      const todos = content

      for (let i = 0; i < todos.length; i++) {
        if (todos[i].img[0] === undefined) {
          todos[i].img = ('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png')
        } else {
          const url = `http://localhost:8000/api/${todos[i].img[0]}/profile_image`

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
    } catch (e) {
      return (e)
    }
  }
}

export const getters = {
  getUsers: (state) => {
    return state.users
  }
}
