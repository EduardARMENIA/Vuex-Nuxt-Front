const Nav = {
  nav () {
    const cookieValue = this.$cookiz.get('jwt')
    alert(cookieValue)
    if (cookieValue !== undefined) {
      return 1
    }
  }
}
export default Nav
