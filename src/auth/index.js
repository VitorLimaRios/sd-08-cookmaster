const JWT = require('jsonwebtoken');

let security = Symbol();

const auth = (token) => {
  try{
    security = '@Qwerty123?!';
    const compare = JWT.verify(token, security);
    return compare;
  } catch (err) {
    console.error(err.message);
    return err.message;
  }
};

module.exports = auth;


// { payload:
//   { id: '60c8d556d44ab1a948e85a2d',
//     email: 'victorfelipeoliveira@hotmail.com',
//     role: 'user' },
//  iat: 1623774576,
//  exp: 1623947376 }