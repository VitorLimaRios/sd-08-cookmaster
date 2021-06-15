const { CREATED, OK } = require('../api/constants/statusCodes');
const { userLogin } = require('../services/loginServices');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // console.log(email, password);

  const userLogged = await userLogin(email, password);
  if (userLogged.errorMessage) {
    const {errorMessage, errorCode} = userLogged;
    return res.status(errorCode).json({ message: errorMessage });
  }

  return res.status(OK).json({token: userLogged});
};

module.exports = {
  loginUser,
};
