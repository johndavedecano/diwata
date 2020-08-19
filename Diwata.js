const assert = require('assert')

const Environment = require('./Environment')

/**
 * Diwata Interpreter
 */
class Diwata {
  constructor(global = new Environment()) {
    this.global = global
  }
  /**
   * Evaluates expression on the given environment
   * @param {*} exp
   */
  eval(exp, env = this.global) {
    // Self Evaluating Expression
    if (isNumber(exp)) return exp
    if (isString(exp)) return exp.slice(1, -1)

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

    // Blocks Expression
    if (exp[0] === 'begin') {
      return this._evalBlock(exp, new Environment({}, env))
    }

    // Variable Declaration
    if (exp[0] === 'var') {
      const [, name, value] = exp
      return env.define(name, this.eval(value, env))
    }

    if (isVariableName(exp)) {
      return env.lookup(exp)
    }

    throw `Unimplemeted:${JSON.stringify(exp)}`
  }

  _evalBlock(block, env) {
    let result

    const [, ...expressions] = block

    expressions.forEach((exp) => {
      result = this.eval(exp, env)
    })

    return result
  }
}

const isNumber = (exp) => typeof exp === 'number'

const isString = (exp) =>
  typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'

const isVariableName = (exp) =>
  typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp)

const diwata = new Diwata(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
  }),
)

// Math Operators
assert.strictEqual(diwata.eval(1), 1)
assert.strictEqual(diwata.eval('"hello"'), 'hello')
assert.strictEqual(diwata.eval(['+', ['+', 5, 1], 10]), 16)
assert.strictEqual(diwata.eval(['/', 5, 5]), 1)

// Variables
assert.strictEqual(diwata.eval(['var', 'x', 10]), 10)
assert.strictEqual(diwata.eval('x'), 10)
assert.strictEqual(diwata.eval(['var', 'y', 100]), 100)
assert.strictEqual(diwata.eval('y'), 100)
assert.strictEqual(diwata.eval('VERSION'), '0.1')
assert.strictEqual(diwata.eval('null'), null)
assert.strictEqual(diwata.eval('true'), true)
assert.strictEqual(diwata.eval('false'), false)
assert.strictEqual(diwata.eval(['var', 'foo', ['*', 2, 2]]), 4)
assert.strictEqual(diwata.eval(['var', 'foo', ['+', 2, 2]]), 4)
assert.strictEqual(diwata.eval(['var', 'foo', ['-', 2, 2]]), 0)
assert.strictEqual(diwata.eval(['var', 'foo', ['%', 2, 2]]), 0)

assert.strictEqual(
  diwata.eval([
    'begin',
    ['var', 'x', 10],
    ['var', 'y', 20],
    ['+', ['*', 'x', 'y'], 30],
  ]),
  230,
)

assert.strictEqual(
  diwata.eval([
    'begin',
    ['var', 'value', 10],
    ['var', 'result', ['begin', ['var', 'x', ['+', 'value', 10]], 'x']],
    'result',
  ]),
  20,
)

console.log('All assertion passed')
