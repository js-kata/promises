module.exports = {
    resolve: (value) =>
        (timeout) =>
            new Promise((resolve) => {
                setTimeout(() => {
                    resolve(value);
                }, timeout || 0)
            }),
    reject: (value) =>
        (timeout) =>
            module.exports.resolve(value)(timeout)
                .then(() => Promise.reject(value))
};
