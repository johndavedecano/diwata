const isNumber = (exp) => typeof exp === 'number'

const isString = (exp) =>
  typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'

const isVariableName = (exp) =>
  typeof exp === 'string' &&
  (/^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp) ||
    ['*', 'x', '+', '-', '/', '%', '>=', '=', '<=', '>', '<'].includes(exp))

module.exports = {
  isNumber,
  isString,
  isVariableName,
}
