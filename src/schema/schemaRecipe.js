const Validation = require('./validation');

const schema = (object) => {
  const { ingredients, preparation, name } = object;
  const validation = new Validation();

  let result = validation.setValue(ingredients)
    .required().string().min().message;
  if (result !== 'pass') return result;
  
  result = validation.setValue(preparation)
    .required().string().min().message;
  if (result !== 'pass') return result;

  result = validation.setValue(name)
    .required().string().min().message;
  if (result !== 'pass') return result;
  return result;
};

module.exports = schema;
