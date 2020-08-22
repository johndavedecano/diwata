const assert = require('assert')
const testUtil = require('./test-util')

module.exports = (i) => {
  assert.strictEqual(
    i.eval([
      'begin',
      ['var', 'x', 10],
      ['var', 'y', 20],
      ['+', ['*', 'x', 'y'], 30],
    ]),
    230,
  )

  assert.strictEqual(
    i.eval([
      'begin',
      ['var', 'value', 10],
      ['var', 'result', ['begin', ['var', 'x', ['+', 'value', 10]], 'x']],
      'result',
    ]),
    20,
  )
}
