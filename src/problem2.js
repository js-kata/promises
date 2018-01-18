const attempt = ([fn, ...fns]) => fn()
  .catch(err => isEmpty(fns) ? Promise.reject(err) : attempt(fns));

// Utils
function isEmpty(arr) {
  return arr.length === 0;
}

module.exports = {attempt};
