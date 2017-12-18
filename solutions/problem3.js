const { isArrayEmpty } = require('./utils')

const first = (promises, errors = []) => isArrayEmpty(promises) 
  ? Promise.reject(errors)
  : promises
    .shift()
    .catch(err => first(promises, [ ...errors, err ]))

module.exports = first