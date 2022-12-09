const Token = {
  save (token) {
    const d = new Date()
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = 'jwt=' + token + ';' + expires + ';path=/'
  }
}

export default Token
