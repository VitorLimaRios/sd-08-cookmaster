const UsersModel = require('../models/UsersModel');
const { validateEntries, emailAlreadyRegistered } = require('./ErrosMensages');

// Regex encontrado em : https://www.w3resource.com/javascript/form/email-validation.php
const EmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const addNewKeyRole = (object) => {
    const { name, email, password } = object;

    return {
            name,
            email,
            password,
            role: 'user',
    }
}

const newReturnObject = (object) => {
    const { name, email, role, _id } = object;

    return {
        user: {
          name,
          email,
          role,
          _id
      }
    };
};

const inputValidation = async (object) => {
    const { name, email, password } = object;

    if(!password || !name
        || !EmailRegex.test(email) || !email) return validateEntries;

    const response = await UsersModel.findEmail(email);

    if(response.length > 0) return emailAlreadyRegistered;
    return true;
};

module.exports = {
    newReturnObject,
    addNewKeyRole,
    inputValidation,
}