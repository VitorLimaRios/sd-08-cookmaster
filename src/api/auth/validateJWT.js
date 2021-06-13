// const jwt = require('jsonwebtoken');
// const model = require('../models/userModel');

// const secret = 'socorro123';
// const fail = 401;

// const validate = async (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) {
//     return res.status(fail).json({ error: 'Token não encontrado' });
//   }

//   try {
//     /* Através o método verify, podemos validar e decodificar o nosso JWT. */
//     const decoded = jwt.verify(token, segredo);
//     /*
//       A variável decoded será um objeto equivalente ao seguinte:
//       {
//         data: {
//           _id: '5e54590ba49448f7e5fa73c0',
//           username: 'italssodj',
//           password: 'senha123'
//         },
//         iat: 1582587327,
//         exp: 1584774714908
//       }
//     */

//     /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
//        por isso não é necessário fazer validação do tempo.
//        Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */
//     const user = await model.findUser(decoded.data.username);

//     /* Não existe um usuário na nossa base com o id informado no token. */
//     if (!user) {
//       return res
//         .status(401)
//         .json({ message: 'Erro ao procurar usuário do token.' });
//     }

//     /* O usuário existe! Colocamos ele em um campo no objeto req.
//        Dessa forma, o usuário estará disponível para outros middlewares que
//        executem em sequência */
//     req.user = user;

//     /* Por fim, chamamos o próximo middleware que, no nosso caso,
//        é a própria callback da rota. */
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: err.message });
//   }
// };