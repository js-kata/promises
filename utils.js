module.exports = {
    resolveWith: (value) => ({
        after: (timeout) =>
            new Promise((resolve) =>
                setTimeout(() =>
                    resolve(value), timeout))
    }),
    rejectWith: (value) => ({
        after: (timeout) =>
            module.exports
                .resolveWith(value)
                .after(timeout)
                .then(() => Promise.reject(value))
    })
};
