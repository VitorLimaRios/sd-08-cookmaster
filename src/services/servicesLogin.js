const ModelUser = require('../models/modelUser');
const CustomError = require('../error/customError');
const schemaLogin = require('../schema/schemaLogin');

const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

let security = Symbol();

class ServicesLogin {
  constructor() {
    this[security] = '@Qwerty123?!';
    this._modelUser = new ModelUser();
  }

  schemaValidator(dataUser) {
    const resultCheck = schemaLogin(dataUser);
    if (resultCheck.key && resultCheck.validError === 'validEmail') {
      return { 'err': 'email' };
    }

    return resultCheck === 'pass' ? true : false;
  }

  async _decrypt(password, hash) {
    const compare = await bcrypt.compare(password, hash);
    return compare;
  }

  async _verifyLoginDB(dataUser) {
    const { email } = dataUser;
    const user = await this._modelUser.getUserByKey({ email });
    return user;
  }

  _createToken(user) {
    const jwtConfig = {
      expiresIn: '2d',
      algorithm: 'HS256',
    };
    const payload = {
      id: user._id,
      email: user.email,
      role: user.role
    };

    const token = JWT.sign({ payload }, this[security], jwtConfig);

    return { token };
  }

  async login(dataUser) {
    try {
      const checkData = this.schemaValidator(dataUser);

      if (!checkData) {
        throw new CustomError(
          'Email or password invalid!',
          'login',
          'l-f-invalid'
        );
      }

      const user = await this._verifyLoginDB(dataUser);
      if (!user || checkData.err) {
        throw new CustomError(
          'Email or password invalid!',
          'email invalid',
          'l-f-incorrect'
        );
      }
      
      // 'password': await this._decrypt(dataUser.password, user.password),
      const compareInfo = {
        'email': dataUser.email === user.email ? true : false,
        'password': dataUser.password === user.password
      };

      if (!compareInfo.email || !compareInfo.password) {
        throw new CustomError(
          'Email or password invalid!',
          'email or password incorrect',
          'l-f-incorrect'
        );
      }
      return this._createToken(user);
    } catch (err) {
      if (err instanceof CustomError) {
        return err.responseError();
      }
      return err;
    }
  }
}

module.exports = ServicesLogin;
