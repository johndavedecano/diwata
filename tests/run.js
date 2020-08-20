const Diwata = require('./../Diwata')
const Environment = require('./../Environment')

const blocksTests = require('./blocks.test')
const mathTests = require('./math.test')
const variables = require('./variables.test')
const ifelse = require('./ifelse.test')
const whiletest = require('./while.test')

const diwata = new Diwata(
  new Environment({
    null: null,
    true: true,
    false: false,
    VERSION: '0.1',
  }),
)

const tests = [blocksTests, mathTests, variables, ifelse, whiletest]

tests.forEach((t) => t(diwata))

console.log('All assertion passed')
