const assert = require('assert')

console.log('testing ifelse.....')

module.exports = (i) => {
  assert.strictEqual(
    i.eval([
      'begin',
      ['var', 'x', 10],
      ['var', 'y', 0],
      ['if', ['>', 'x', 10], ['set', 'y', 20], ['set', 'y', 30]],
      'y',
    ]),
    30,
  )
}
