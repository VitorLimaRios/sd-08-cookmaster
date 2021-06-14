const { CREATED } = require('../api/constants/statusCodes');
const { addsUser } = require('../services/userServices');

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const createdUser = await addsUser(name, email, password);
  if(createdUser.errorMessage) {
    const {errorMessage, errorCode} = createdUser;
    return res.status(errorCode).json({ message: errorMessage });
  }
  return res.status(CREATED).json({user: {...createdUser}});
};

module.exports = {
  createUser,
};
