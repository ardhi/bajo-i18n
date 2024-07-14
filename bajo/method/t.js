function t (...params) {
  return this.instance ? this.instance.t(...params) : params
}

export default t
