const jwt = require('jsonwebtoken');
const model = require('../../models/user');

const secret = 'tokenSecret';
const QOU = 401;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(QOU).json({ error: 'Token não encontrado' });
  }

  try {
    const decoded = jwt.verify(token, secret);

    const email = await model.findUser(decoded.data.email);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          _id: '5e54590ba49448f7e5fa73c0',
          email: 'teste@teste.com.br',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    if (!email) {
      return res
        .status(QOU)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.email = email;

    next();
  } catch (err) {
    return res.status(QOU).json({ message: err.message });
  }
};
