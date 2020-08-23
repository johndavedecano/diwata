const assert = require('assert')

function test(lang, code, expected) {
  const exp = langParser.parse(code)
  assert.strictEqual(lang.eval(exp), expected)
}

module.exports = { test }
