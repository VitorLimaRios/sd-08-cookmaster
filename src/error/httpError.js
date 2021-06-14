const message = require('./msg');
const CODE = require('./code');

class HTTPError extends Error {
  /**
   * @param {string} [msgCode]
   * [pr-inv]
   * [email-exist]
   */

  constructor(message, nameFunction, msgCode) {
    super(`${message} -- ${nameFunction}`);
    this.name = this.constructor.name;
    this.code = CODE.internalError;
    this.msgCode = msgCode;
  }

  responseError(msgCustom) {
    return (
      message[this.msgCode] || { err: { message: msgCustom }, code: this.code }
    );
  }

  responseNull() {
    return '';
  }
}

module.exports = HTTPError;

// -------------------------------------------------------------------
// https://javascript.info/custom-errors
// https://gist.github.com/TooTallNate/4fd641f820e1325695487dfd883e5285
// --------------------------------------------------------------------
