function first(list) {
    return new Promise((resolve, reject) => {
        let errors = [];
        list.forEach(func => {
            func
                .then(resolve)
                .catch(err => {
                    errors.push(err);
                    if (list.length === errors.length)
                        reject(errors);
                });
        });
    });
}

module.exports = {
    first: first
}
