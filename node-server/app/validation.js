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

// Login Validation
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

// Change Password Validation
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

// Delete User Validation
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

// Pair/Unpair Pi Validation
const pairPiValidation = (data) => {
    const schema = {
        device: Joi.string()
            .required()
            .min(9)
            .max(9)
    };

    return Joi.validate(data, schema);
};

// Bar Code Validation
const barCodeValidation = (data) => {
    const schema = {
        name: Joi.string()
            .required(),
        barCode: Joi.string()
            .min(12)
            .max(12),
        flag: Joi.number() // 0 = remove item, 1 = add item
            .required(),
    };

    return Joi.validate(data, schema);
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.changePasswordValidation = changePasswordValidation;
module.exports.deleteUserValidation = deleteUserValidation;
module.exports.pairPiValidation = pairPiValidation;
module.exports.barCodeValidation = barCodeValidation;