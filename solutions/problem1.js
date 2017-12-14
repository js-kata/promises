module.exports = promise => promise.then(
  res => Promise.reject(res),
  err => err
)