const { isArrayEmpty } = require('./utils')

const attempt = (promises, last = 0) => isArrayEmpty(promises)
  ? Promise.reject(last)
  : promises
      .shift()()
      .catch(err => attempt(promises, err))

module.exports = attempt