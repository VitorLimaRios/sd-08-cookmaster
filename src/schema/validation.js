
class Validation {
  constructor() {
    this.key = '';
    this.param = '';
    this.MIN = 3;
    this.result = true;
    this.aux = true;
    this.message = 'pass';
  }
  
  setValue(object) {
    if (typeof object !== 'object') {
      object = { [object]: object ? object : '' };
    }
    this.key = Object.keys(object)[0];
    this.param = Object.values(object)[0];
    return this;
  }
  
  resolve(nameFunction) {
    if (this.message === 'pass') {
      this.message = this.result ? 'pass' : { validError: nameFunction, key: this.key };
    }
  };
    
  required() {
    if (!Object.keys(this.param).length || (Array.isArray(this.param) && !this.length)){
      this.result = false;
      this.aux = false;
      this.resolve('required');
      return this;
    }
    this.aux = this.param ? true : false;
    this.result = this.result && this.aux;
    this.resolve('required');
    return this; 
  };
    
  string() {
    this.aux = typeof this.param === 'string' ? true : false;
    this.result = this.result && this.aux;
    this.resolve('string');
    return this;
  };
    
  validEmail() {
    // regex 
    // https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
    // community wiki 3 revs, 2 users 90% Jaskaran Singh
    this.aux = new RegExp(
      /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
    )
      .test(this.param);
    this.result = this.result && this.aux;
    this.resolve('email');
    return this;
  };
    
  min(min = this.MIN) {
    if(!this.param) {
      this.aux = false;
      this.result = false;
      this.resolve('min');
      return this;
    }
    this.aux = this.param.length >= min ? true : false;
    this.result = this.result && this.aux;
    this.resolve('min');
    return this;
  };
};

module.exports = Validation;
