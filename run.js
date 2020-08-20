const Diwata = require('./Diwata')
const Environment = require('./Environment')

const blocksTests = require('./tests/blocks.test')
const mathTests = require('./tests/math.test')
const variables = require('./tests/variables.test')

const diwata = new Diwata(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
  }),
)

const tests = [(blocksTests, mathTests, variables)]

tests.forEach((t) => t(diwata))

console.log('All assertion passed')
