class Environment {
  constructor(record = {}, parent = null) {
    this.record = record
    this.parent = parent
  }

  /**
   * Creates a variable with a given name and value.
   *
   * @param {*} name
   * @param {*} value
   */
  define(name, value) {
    this.record[name] = value
    return value
  }

  /**
   * Creates a variable with a given name and value.
   *
   * @param {*} name
   * @param {*} value
   */
  assign(name, value) {
    this.resolve(name).record[name] = value
    return value
  }

  /**
   * Looks up for variable value
   *
   * @param {*} name
   */
  lookup(name) {
    return this.resolve(name).record[name]
  }

  resolve(name) {
    if (this.record.hasOwnProperty(name)) {
      return this
    }
    if (this.parent === null) {
      throw new ReferenceError('Variable ' + name + '  is not defined')
    }
    return this.parent.resolve(name)
  }
}

module.exports = Environment
