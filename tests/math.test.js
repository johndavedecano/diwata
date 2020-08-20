const assert = require('assert')

module.exports = (i) => {
  // Math Operators
  assert.strictEqual(i.eval(1), 1)
  assert.strictEqual(i.eval('"hello"'), 'hello')
  assert.strictEqual(i.eval(['+', ['+', 5, 1], 10]), 16)
  assert.strictEqual(i.eval(['/', 5, 5]), 1)
}
