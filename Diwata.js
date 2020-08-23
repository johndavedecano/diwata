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
  constructor(global = GlobalEnvironment) {
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

    if (Utils.isVariableName(exp)) {
      return env.lookup(exp)
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

    if (Array.isArray(exp)) {
      const fn = this.eval(exp[0], env)

      const args = exp.slice(1).map((arg) => this.eval(arg, env))

      if (typeof fn === 'function') {
        return fn(...args)
      }
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

const GlobalEnvironment = new Environment({
  null: null,
  true: true,
  false: false,
  VERSION: '0.1',
  // Operators
  '+'(op1, op2) {
    return op1 + op2
  },
  '-'(op1, op2 = null) {
    if (op2 == null) return -op1
    return op1 - op2
  },
  '/'(op1, op2) {
    return op1 / op2
  },
  '*'(op1, op2) {
    return op1 * op2
  },
  '%'(op1, op2) {
    return op1 % op2
  },
  '>'(op1, op2) {
    return op1 > op2
  },
  '<'(op1, op2) {
    return op1 < op2
  },
  '>='(op1, op2) {
    return op1 >= op2
  },
  '<='(op1, op2) {
    return op1 <= op2
  },
  '='(op1, op2) {
    return op1 === op2
  },
})

module.exports = Diwata
