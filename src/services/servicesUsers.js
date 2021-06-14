const HTTPError = require('../error/httpError');
const ModelUser = require('../models/modelUser');
const schemaUser = require('../schema/schemaUser');

class ServicesUsers {
  constructor() {
    this._modelUser = new ModelUser();
    this.serviceCreateUser = this.serviceCreateUser.bind(this);
    this._checkForDuplicateEmail = this._checkForDuplicateEmail.bind(this);
    this._checkingNewUserInformation = this._checkingNewUserInformation.bind(this);
  }

  checkForAdmin(role) {
    return '';
  }

  async _checkForDuplicateEmail(email) {
    const resultCheck = await this._modelUser.getUserByKey(email);
    return resultCheck ? false : true;
  }


  _serviceSchema(checkDocument) {
    const result = schemaUser(checkDocument);
    return result.error ? result.error : result.value;
  }

  async _checkingNewUserInformation(newUserData, authorization) {
    const { email } = newUserData;
    console.log(this._serviceSchema(newUserData));
    const check = {
      theEmailDoesNotExist: await this._checkForDuplicateEmail({ email }),
      role: authorization ? 'admin' : 'users',
      schema: this._serviceSchema(newUserData),
    };
    return {
      privileges: check.role,
      ok: check.theEmailDoesNotExist && !check.schema
    };
  }

  async serviceCreateUser(newUserData, authorization = false) {
    try{
      const checkingInfo = await this._checkingNewUserInformation(
        newUserData, authorization
      );
      if (!checkingInfo.ok || !checkingInfo.privileges) {
        throw new HTTPError('400', 'ERRO', this.serviceCreateUser.name);
      }
    }catch (err) {
      return err.responseError('Invalid entries. Try again');
    }
  }
}

module.exports = ServicesUsers;
