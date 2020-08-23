const { test } = require('./test-util')

console.log('testing math.....')

module.exports = (i) => {
  test(i, `(+ 1 5)`, 6)
  test(i, `(+ (+ 2 3) 5)`, 10)
  test(i, `(+ (* 2 3) 5)`, 11)

  test(i, `(> 1 5)`, false)
  test(i, `(< 1 5)`, true)

  test(i, `(>= 5 5)`, true)
  test(i, `(<= 5 5)`, true)
  test(i, `(= 1 5)`, false)
}
