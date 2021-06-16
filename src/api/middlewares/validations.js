const Schemas = require('../schemas');
const tcw = require('../utils').tryCatchWrapper;

const options = { errors: { wrap: { label: '\'' } } };

const validate = (resource, code = 'bad_request') => (type) => (
  tcw(async (req, _res, next) => {
    const schema = Schemas[resource][type];
    await schema.validateAsync(req.body, options);
    next();
  }, code)
);

module.exports = {
  Users: validate('Users'),
  Login: validate('Login', 'unauthenticated'),
  Recipes: validate('Recipes'),
};
