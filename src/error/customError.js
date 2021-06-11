// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Error
function customError(errMessage, code) {
  this.message = {    
    'message': errMessage,
  };
  this.stack = Error().stack;
  this.code = code;
}

customError.prototype = Object.create(Error.prototype);
customError.prototype.constructor = customError;

module.exports = customError;
