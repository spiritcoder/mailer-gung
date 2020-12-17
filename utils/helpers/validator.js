module.exports.emailValidator = (email) => {
    const filter = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return filter.test(email);
}

module.exports.stringValidator = (dataToValidate) => {
    return (dataToValidate.length > 1 && typeof dataToValidate == 'string')
}