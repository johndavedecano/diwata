const assert = require('assert')

const testUtil = require('./test-util')

console.log('testing blocks.....')

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

  testUtil.test(
    i,
    `
    (begin 
      (var x 10)
      (var y 20)
      (+ (* x 10) y))
  `,
    120,
  )
}
