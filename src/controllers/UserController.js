const Service = require('../services/UserService');
const jwt = require('jsonwebtoken');

const secret = 'ayrtonSenha';

const httpCreateSuccess = 201;
const httpsNotSuccess = 400;

const create = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    const result = await Service.create({name, email, password, role});
    const { password: pass, ...otherInfo} = result;
    res.status(httpCreateSuccess).json({user: otherInfo});

  } catch (error) {
    console.log(error);
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});   
  }
};

const login = async (req, res) => {
  try {
    const {email, password} = req.body;
    const result = await Service.login({email, password});

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const { password: pass, id, role, ...user } = result.user;

    const token = jwt.sign({ data: user }, secret, jwtConfig);

    res.status(result.status).json({token});

  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message}); 
  }

};

module.exports = {
  create,
  login
};
