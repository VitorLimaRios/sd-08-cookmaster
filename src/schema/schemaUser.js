// const valid = {
//   'required': (param) => param ? true : false,
//   'string': (param) => typeof param === 'string' ? true : false,
//   'email': (param) => new RegExp(/\S+@\w+\.\w{2, 6}/g).test(param),
//   'min': (param, min = 3) => param.length <= min ? true : false, 
// };

const valid = (property) =>  {
  const key = Object.keys(property)[0];
  const param = Object.values(property)[0];
  const MIN = 3;
  this.result = true;
  this.aux = true;
  this.message = 'pass';
  this.resolve = (nameFunction) => {
    if (this.message === 'pass') {
      this.message = this.result ? 'pass' : { error: nameFunction, key };
    }
  };
  this.required = () => {
    console.log('required');
    this.aux = param ? true : false;
    this.result = this.result && this.aux;
    this.resolve('required');
    return this; 
  };
  this.string = () => {
    this.aux = typeof param === 'string' ? true : false;
    this.result = this.result && this.aux;
    this.resolve('string');
    return this;
  };
  this.validEmail = () => {
    this.aux = new RegExp(/\S+@\w+\.\w{2, 6}/g).test(param);
    this.result = this.result && this.aux;
    this.resolve('email');
    return this;
  };
  this.min = (min = MIN) => {
    this.aux = param.length >= min ? true : false;
    this.result = this.result && this.aux;
    this.resolve('min');
    return this;
  };
  return this;
};

// const n = valid({ email: 'Vi' });
console.log(valid({ name: 'Victor'}).string().message);

// const schema = (user) => {
//   const { name, password, email } = user;
//   if (valid.required(name))
// };

// // .pattern(RegExp(/\S+@\w+\.\w{2, 6}/)),
// module.exports = joiValidUser;
