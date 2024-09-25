function t (...params) {
  if (!this.instance) return params[0]
  return this.instance.t(...params)
}

export default t
