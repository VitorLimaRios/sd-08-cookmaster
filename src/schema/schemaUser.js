// const valid = {
//   'required': (param) => param ? true : false,
//   'string': (param) => typeof param === 'string' ? true : false,
//   'email': (param) => new RegExp(/\S+@\w+\.\w{2, 6}/g).test(param),
//   'min': (param, min = 3) => param.length <= min ? true : false, 
// };

class ValidUser {
  constructor() {
    this.key = '';
    this.param = '';
    this.MIN = 3;
    this.result = true;
    this.aux = true;
    this.message = 'pass';
  }
  
  setValue(object) {
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
    console.log(this.aux);
    this.result = this.result && this.aux;
    this.resolve('email');
    return this;
  };
    
  min(min = this.MIN) {
    if(!this.param) {
      this.aux = false;
      this.result = false;
      return this;
    }
    this.aux = this.param.length >= min ? true : false;
    this.result = this.result && this.aux;
    this.resolve('min');
    return this;
  };
};

const schema = (user) => {
  const { name, password, email } = user;
  const isValid = new ValidUser();

  let result = isValid.setValue({ name }).required().min().string().message; 
  if (result !== 'pass') {
    return result;
  }

  result = isValid.setValue({ password })
    .required().min().string().message;
  if (result !== 'pass') {
    return result;
  }

  result = isValid.setValue({ email })
    .required().string().validEmail().message;
  if (result !== 'pass'){
    return result;
  }
  return result;
};

module.exports = schema;
