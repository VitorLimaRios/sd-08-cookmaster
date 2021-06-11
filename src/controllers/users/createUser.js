const express = require('express');

const UserModel = require('../../models/index');
const Service = require('../../services/index');

const CREATED_CODE = 201;
const BAD_REQUEST_CODE = 400;
const CONFLICT_CODE = 409;
const INVALID_ENTRIES_MESSAGE = 'Invalid entries. Try again.';
const ALREADY_EXIST = 'Email already registered';

module.exports = async (req, res, _next) => {
  const { name, email, password } = req.body;
  const role = 'user';

  if (!Service.userDataVerification(name, email, password)) {
    return res.status(BAD_REQUEST_CODE).json({ message: INVALID_ENTRIES_MESSAGE });
  }

  const verifyEmailExists = await UserModel.getUserByEmail(email);
  if (verifyEmailExists) {
    return res.status(CONFLICT_CODE).json({ message: ALREADY_EXIST });
  }

  const response = await UserModel.createUser({ name, email, password, role });

  res.status(CREATED_CODE).json({ user: response });
};
