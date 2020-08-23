const assert = require('assert')
const diwataParser = require('./../parser/diwataParser')

function test(lang, code, expected) {
  const exp = diwataParser.parse(code)
  assert.strictEqual(lang.eval(exp), expected)
}

module.exports = { test }
