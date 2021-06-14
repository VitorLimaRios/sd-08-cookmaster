const { STATUS_CODES } = require('http');

class HTTPError extends Error {
  constructor(code, message, nameFunction) {
    super(`${ message } -- ${ STATUS_CODES[code] } -- ${ nameFunction }`);
    this.name = this.constructor.name;
    this.code = code;
  }

  responseError(messageCustom) {
    return { message: messageCustom, code: this.code };
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