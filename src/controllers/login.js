const { findUser } = require('../services/users');
const INTERNAL_ERROR = 500;

const login = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;
    const result = await findUser(email, password);

    return res.status(result.status).json({token: result.message});
  } catch (e) {
    return res.status(INTERNAL_ERROR).json({ message: 'Erro interno', error: e});
  }
};

module.exports = { login };