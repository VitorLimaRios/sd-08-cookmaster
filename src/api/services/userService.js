const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const secret = 'seusecretdetoken';
const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const validarPropriedades = async (usuario) => {
  const { name, email, password, role } = usuario;
  const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  if(!name || !email || !regexEmail.test(email) || !password) 
    throw new Error ('Invalid entries. Try again.');
};

const validarUnicoEmail = async (usuario) => {
  const {email} = usuario;
  const usuarioBuscado = await userModel.buscarUsuarioPorEmail(email);
  if(usuarioBuscado)
    throw new Error('Email already registered');
};

const validarInsercao = async (usuario) => {
  await validarPropriedades(usuario);
  await validarUnicoEmail(usuario);
};

const criar = async (usuario) => {
  
  await validarInsercao(usuario);
  const result = await userModel.cadastrarUsuario(usuario);
  const { password, ...usuarioSemPassword} = result;
  return usuarioSemPassword;
};

const validarLogin = async (usuario) => {
  const {email, password} = usuario;
  if (!email || !password) throw new Error('All fields must be filled');

  const usuarioBuscado = await userModel.buscarUsuarioPorEmail(email);

  if (!usuarioBuscado || usuarioBuscado.password !== password) 
    throw new Error('Incorrect username or password');
    
};

const login = async (usuario) => {
  await validarLogin(usuario);
  const {email, password} = usuario;
  const token = jwt.sign({email, password}, secret, jwtConfig);
  return token;
};

module.exports = {
  criar,
  login,
};