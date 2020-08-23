const Diwata = require('./../Diwata')
const Environment = require('./../Environment')

const blocksTests = require('./blocks.test')
const mathTests = require('./math.test')
const variables = require('./variables.test')
const ifelse = require('./ifelse.test')
const whiletest = require('./while.test')
const builtinunctions = require('./builtinunctions.test')

const diwata = new Diwata()

const tests = [
  blocksTests,
  mathTests,
  variables,
  ifelse,
  whiletest,
  builtinunctions,
]

tests.forEach((t) => t(diwata))

console.log('All assertion passed')
