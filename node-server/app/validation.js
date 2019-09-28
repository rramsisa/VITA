// Validation
const Joi = require('@hapi/joi');

// Registration Validation
const registerValidation = (data) => {
    const schema = {
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const loginValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const changePasswordValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required(),
        newPassword: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const deleteUserValidation = (data) => {
    const schema = {
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    };

    return Joi.validate(data, schema);
};

const pairPiValidation = (data) => {
    const schema = {
        device: Joi.string()
            .required()
    };

    return Joi.validate(data, schema);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changePasswordValidation = changePasswordValidation;
module.exports.deleteUserValidation = deleteUserValidation;
module.exports.pairPiValidation = pairPiValidation;