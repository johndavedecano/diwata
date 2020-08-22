const assert = require('assert')

console.log('testing variables.....')
module.exports = (i) => {
  // Variables
  assert.strictEqual(i.eval(['var', 'x', 10]), 10)
  assert.strictEqual(i.eval(['set', 'x', 10]), 10)
  assert.strictEqual(i.eval('x'), 10)
  assert.strictEqual(i.eval(['var', 'y', 100]), 100)
  assert.strictEqual(i.eval('y'), 100)
  assert.strictEqual(i.eval('VERSION'), '0.1')
  assert.strictEqual(i.eval('null'), null)
  assert.strictEqual(i.eval('true'), true)
  assert.strictEqual(i.eval('false'), false)
  assert.strictEqual(i.eval(['var', 'foo', ['*', 2, 2]]), 4)
  assert.strictEqual(i.eval(['var', 'foo', ['+', 2, 2]]), 4)
  assert.strictEqual(i.eval(['var', 'foo', ['-', 2, 2]]), 0)
  assert.strictEqual(i.eval(['var', 'foo', ['%', 2, 2]]), 0)
}
