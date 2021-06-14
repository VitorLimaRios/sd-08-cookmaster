const HTTPError = require('../error/httpError');
const ModelUser = require('../models/modelUser');
const schemaUser = require('../schema/schemaUser');

class ServicesUsers {
  constructor() {
    this._modelUser = new ModelUser();
    this.serviceCreateUser = this.serviceCreateUser.bind(this);
    this._checkForDuplicateEmail = this._checkForDuplicateEmail.bind(this);
    this._checkingNewUserInformation =
      this._checkingNewUserInformation.bind(this);
  }

  checkForAdmin(role) {
    return '';
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
      'emailExist': await this._checkForDuplicateEmail({ email }),
      'role': authorization ? 'admin' : 'user',
      'schema': this._serviceSchema(newUserData),
    };
    return check;
  }

  viewer(object, authorization) {
    if (!authorization) {
      delete object.password;
    }
    return {
      user: object
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
        throw new HTTPError(
          'Error schema invalid',
          this.serviceCreateUser.name,
          'pr-inv'
        );
      }

      if (emailExist) {
        throw new HTTPError(
          'Error email already exists',
          this.serviceCreateUser.name,
          'email-exist'
        );
      }

      const setNewUser = await this._modelUser.createUser({ ...newUserData, role });
      
      return this.viewer(setNewUser, authorization);
    } catch (err) {
      if (err instanceof HTTPError) {
        return err.responseError();
      }
      console.error(err);
      return { 'message': this.serviceCreateUser.name, 'code': 500 };
    }
  }
}

module.exports = ServicesUsers;
