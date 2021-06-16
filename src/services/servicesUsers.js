const CustomError = require('../error/customError');
const ModelUser = require('../models/modelUser');
const schemaUser = require('../schema/schemaUser');
const bcrypt = require('bcrypt');

class ServicesUsers {
  constructor() {
    this._modelUser = new ModelUser();
    // this.serviceCreateUser = this.serviceCreateUser.bind(this);
    // this._checkForDuplicateEmail = this._checkForDuplicateEmail.bind(this);
    // this._checkingNewUserInformation =
    //   this._checkingNewUserInformation.bind(this);
    this._salt = 5;
  }

  async _encryptPass(password) {
    const salt = await bcrypt.genSalt(this._salt);
    const passWordEncrypted = await bcrypt.hash(password, salt);
    return passWordEncrypted;
  }

  async _checkForDuplicateEmail(email) {
    const resultCheck = await this._modelUser.getUserByKey(email);
    return resultCheck ? true : false;
  }

  _serviceSchema(checkDocument) {
    const result = schemaUser(checkDocument);
    return result === 'pass' ? 'pass' : result;
  }

  async _checkingNewUserInformation(newUserData, authorization) {
    const { email } = newUserData;
    const check = {
      emailExist: await this._checkForDuplicateEmail({ email }),
      role: authorization ? 'admin' : 'user',
      schema: this._serviceSchema(newUserData),
    };
    return check;
  }

  viewerNotPassword(object, authorization) {
    if (!authorization) {
      delete object.password;
    }
    return {
      user: object,
    };
  }

  async serviceCreateUser(newUserData, authorization = false) {
    try {
      const checkingInfo = await this._checkingNewUserInformation(
        newUserData,
        authorization
      );

      const { schema, emailExist, role } = checkingInfo;

      if (schema !== 'pass') {
        throw new CustomError(
          'Error schema invalid',
          this.serviceCreateUser.name,
          'pr-inv'
        );
      }

      if (emailExist) {
        throw new CustomError(
          'Error email already exists',
          this.serviceCreateUser.name,
          'email-exist'
        );
      }
      // const hash = await this._encryptPass(newUserData.password);
      const setNewUser = await this._modelUser.createUser({
        ...newUserData,
        role,
      });

      return this.viewerNotPassword(setNewUser, authorization);
    } catch (err) {
      if (err instanceof CustomError) {
        return err.responseError();
      }
      console.error(err);
      return { err: { message: this.serviceCreateUser.name }, code: 500 };
    }
  }
}

module.exports = ServicesUsers;
