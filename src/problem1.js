const isObject = item => typeof item === "object"
  && !Array.isArray(item)
  && item !== null;

const wrapWithObject = res =>
  isObject(res) ? res : {fromMyCatch: false, res};

const negation = promise => promise
  .catch(err => Promise.resolve({fromMyCatch: true, res: err}))
  .then(wrapWithObject)
  .then(({fromMyCatch, res}) =>
    // TODO: ASK: What is prettier?
    fromMyCatch ? Promise.resolve(res) : Promise.reject(res));
    // TODO: OR fromMyCatch ? res : Promise.reject(res));

module.exports = {negation};