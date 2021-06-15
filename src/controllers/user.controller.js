const { StatusCodes: { 
  CREATED, BAD_REQUEST, 
  OK, 
  UNAUTHORIZED 
} } = require('http-status-codes');
const { createUser, loginUser } = require('../services/userManagement.service');


exports.register = async (req, res) => {
  const form = req.body;
  try {
    const user = await createUser(form);
    res.status(CREATED).json(user);
  } catch (err) {
    res.status(BAD_REQUEST).json({message: err.message});
  }
};

exports.login = async (req, res) => {
  const form = req.body;
  try {
    const token = await loginUser(form);
    res.status(OK).json(token);
  } catch (err) {
    res.status(UNAUTHORIZED).json({message: err.message});
  }
};

// exports.getAll = async (req, res) => {
//   try {
//     res.status(200).json({message: ''});
//   } catch (err) {
//     res.status(422).json({message: err.message});
//   }
// };

// exports.getById = async (req, res) => {
//   try {
//     res.status(200).json({message: ''});
//   } catch (err) {
//     res.status(422).json({message: err.message});
//   }
// };