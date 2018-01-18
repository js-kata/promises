// promises = [p1, p2, p3]
// promisesWithIds = [w1, w2, w3] = [{i: i1, p: p1}, {i: i1, p: p1}, {i: i1, p: p1}]
const firstWithErrors = (promises, errors = []) => promises
  // .map(promise => )
  // .race(promises)
// catch 3

const first = promises => firstWithErrors(promises);

module.exports = {first};
