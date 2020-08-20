const assert = require('assert')

module.exports = (i) => {
  assert.strictEqual(
    i.eval([
      'begin',
      ['var', 'counter', 0],
      ['var', 'result', 0],
      [
        'while',
        ['<', 'counter', 10],
        [
          'begin',
          ['set', 'result', ['+', 'result', 1]],
          ['set', 'counter', ['+', 'counter', 1]],
        ],
      ],
      'result',
    ]),
    10,
  )
}
