function negation(promise) {
    return new Promise((resolve, reject) => {
        promise
            .then(value => {
                reject(value);
            })
            .catch(err => {
                resolve(err);
            });
    });
}

module.exports = {
    negation: negation
};
