const { isArrayEmpty, isArrayFull } = require('./utils')

const takeFirst = (count, ...promises) => isArrayEmpty(promises)
  ? Promise.resolve([])
  : new Promise((resolve, reject) => {
    const results = []

    return promises.map(promise => promise
      .then(val => results.push(val) 
        && isArrayFull(results, count) 
        && resolve(results.slice(0, count))
      )
      .catch(err => reject(err))
    )
  })

module.exports = takeFirst