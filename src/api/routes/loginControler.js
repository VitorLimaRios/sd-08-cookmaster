const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const {
  tryLogin
} = require('../service/loginService');

const app = express();

https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

const router = express.Router();

// 2 - Crie um endpoint para o login de usuários
router.post('/', rescue(async(req, res) => {
  const { body } = req;
  const end = await tryLogin(body, res);
  return end;
}));

module.exports = { router };