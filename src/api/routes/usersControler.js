const express = require('express');
const rescue = require('express-rescue');
const bodyParser = require('body-parser');

const {
  tryAddUser,
} = require('../service/userService');

const app = express();

https://stackoverflow.com/questions/9177049/express-js-req-body-undefined
// var jsonParser = bodyParser.json();
// var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json());

const router = express.Router();

// 1 - Crie um endpoint para o cadastro de usuários

router.post('/',
  // jsonParser,
  rescue(async(req, res) => {
    const { body } = req;
    const end = await tryAddUser(body, res);
    return end;
  }));

module.exports = { router };
