const LoginServices = require('../services/LoginServices');

const HTT_SATATUS_OK = 200;

const checkUserInBank = async (req, resp) => {
  const { email, password } = req.body;

  const response = await LoginServices.checkUserInBank(email, password);

  if(response.code) return resp.status(response.code).json(response.message);

  resp.status(HTT_SATATUS_OK).json(response);    
};

module.exports = {
  checkUserInBank,
};
