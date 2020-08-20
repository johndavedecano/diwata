const Environment = require('./Environment')
const Utils = require('./Utilities')

/**
 * Diwata Interpreter
 */
class Diwata {
  /**
   * Constructor
   * @param {Environment} global
   */
  constructor(global = new Environment()) {
    this.global = global
  }

  /**
   * Evaluates expression on the given environment
   * @param {*} exp
   */
  eval(exp, env = this.global) {
    // Self Evaluating Expression
    if (Utils.isNumber(exp)) return exp
    if (Utils.isString(exp)) return exp.slice(1, -1)

    // Math Operators
    if (exp[0] === '+') {
      return this.eval(exp[1], env) + this.eval(exp[2], env)
    }
    if (exp[0] === '*') {
      return this.eval(exp[1], env) * this.eval(exp[2], env)
    }
    if (exp[0] === '-') {
      return this.eval(exp[1], env) - this.eval(exp[2], env)
    }
    if (exp[0] === '%') {
      return this.eval(exp[1], env) % this.eval(exp[2], env)
    }
    if (exp[0] === '/') {
      return this.eval(exp[1], env) / this.eval(exp[2], env)
    }
    // Comparison Operators
    if (exp[0] === '>') {
      return this.eval(exp[1], env) > this.eval(exp[2], env)
    }

    if (exp[0] === '>=') {
      return this.eval(exp[1], env) >= this.eval(exp[2], env)
    }

    if (exp[0] === '<') {
      return this.eval(exp[1], env) < this.eval(exp[2], env)
    }

    if (exp[0] === '<=') {
      return this.eval(exp[1], env) <= this.eval(exp[2], env)
    }

    if (exp[0] === '=') {
      return this.eval(exp[1], env) === this.eval(exp[2], env)
    }

    // Blocks Expression
    if (exp[0] === 'begin') {
      return this._evalBlock(exp, new Environment({}, env))
    }

    // Variable Declaration
    if (exp[0] === 'var') {
      const [, name, value] = exp
      return env.define(name, this.eval(value, env))
    }

    // Set Declaration
    if (exp[0] === 'set') {
      const [, name, value] = exp
      return env.assign(name, this.eval(value, env))
    }

    // If Expression
    if (exp[0] === 'if') {
      const [, condition, consequent, alternate] = exp
      if (this.eval(condition, env)) {
        return this.eval(consequent, env)
      }
      return this.eval(alternate, env)
    }

    // While Expression
    if (exp['0'] === 'while') {
      const [, condition, body] = exp
      let result
      while (this.eval(condition, env)) {
        result = this.eval(body, env)
      }
      return result
    }

    if (Utils.isVariableName(exp)) {
      return env.lookup(exp)
    }

    throw `Unimplemeted:${JSON.stringify(exp)}`
  }

  /**
   * Evaluates blocks or closure
   *
   * @param {*} block
   * @param {*} env
   */
  _evalBlock(block, env) {
    let result

    const [, ...expressions] = block

    expressions.forEach((exp) => {
      result = this.eval(exp, env)
    })

    return result
  }
}

module.exports = Diwata
