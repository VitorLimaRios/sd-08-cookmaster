module.exports = [
  {
    title: 'Quando o campo email não for informado',
    body: {
      password: '12345678'
    },
    errorMessage: 'All fields must be filled',
  },
  {
    title: 'Quando o campo password não for informado',
    body: {
      email: 'erickjacquin@gmail.com'
    },
    errorMessage: 'All fields must be filled',
  },
  {
    title: 'Quando o campo email for inválido',
    body: {
      email: 'erickjacquin@',
      password: '12345678'
    },
    errorMessage: 'Incorrect username or password',
  },
  {
    title: 'Quando o campo password for inválido',
    body: {
      email: 'erickjacquin@gmail.com',
      password: '12'
    },
    errorMessage: 'Incorrect username or password',
  }
];
