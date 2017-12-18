function takeFirst(count, ...promises) {
    if (!promises.length) return Promise.resolve([]);
    return new Promise((resolve, reject) => {
        let results = [];
        promises.forEach(func => {
            func
                .then(val => {
                    if (results.length < count)
                        results.push(val);
                    if (results.length === count)
                        resolve(results);
                })
                .catch(e => {
                    if (results.length !== count)
                        reject(e);
                });
        })
    });
}

module.exports = {
    takeFirst: takeFirst
};
