const userModel = require('../../model/usersModel');
const { ObjectId } = require('mongodb');

const validateName = async (userId, email, role) => {
  if (role === 'admin') return false;
  const user = await userModel.getUserByEmail(email);
  const { _id: id } = user;
  if (id !== userId) return true;
  return false;
};

module.exports = validateName;
