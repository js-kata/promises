function attempt(list) {
    let reject = Promise.reject();
    list.forEach(func => {
        reject = reject.catch(func);
    });
    return reject;
}

module.exports = {
    attempt: attempt
};
