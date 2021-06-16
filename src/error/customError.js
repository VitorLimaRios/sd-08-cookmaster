const message = require('./msg');
const CODE = require('./code');

class CustomError extends Error {
  /**
   * @param {string} [msgCode]
   * [pr-inv] [email-exist] [l-f-invalid]
   * [l-f-incorrect] [r-i-jwt] [r-n-found]
   * [m-a-token]
   * 
   * @param {string} [message]
   * @param {string} [otherInfo]
   */

  constructor(message, otherInfo, msgCode) {
    super(`${message} -- ${otherInfo}`);
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

module.exports = CustomError;

// --------------------------------------------------------------------
// https://javascript.info/custom-errors
// https://gist.github.com/TooTallNate/4fd641f820e1325695487dfd883e5285
// --------------------------------------------------------------------
