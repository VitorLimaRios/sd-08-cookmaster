
const jwt = require('jsonwebtoken');
const {
  findUserbyname
} = require('../../models/usersModel');


const cdi = 401;
const cd = 400;

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */

const secret = 'cookMaster';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const token = req.headers['authorization'];
  
  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(cdi).json({ message: 'jwt malformed' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, secret);
    //console.log('validate32',decoded);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          _id: '5e54590ba49448f7e5fa73c0',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */
    const user = await findUserbyname(decoded.name);

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(cd)
        .json({ message: 'jwt malformed' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(cdi).json({ message: err.message });
  }
};