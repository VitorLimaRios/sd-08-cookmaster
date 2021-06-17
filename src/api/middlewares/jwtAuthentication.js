const jwt = require('jsonwebtoken');
const { publicKey } = require('../.env').api.jwt;
const Services = require('../services');

module.exports = (resource) => async (req, _res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) next({ code: 'unauthenticated', message: 'missing auth token' });

    const payload = jwt.verify(token, publicKey);
    
    const { result: Resource} = await Services[resource].findById(payload.data._id);
    if (!Resource) next({ code: '', message: `Invalid ${resource}` });
    
    req.resource = Resource;
    next();
  } catch (err) {
    next({ code: 'unauthenticated', message: 'jwt malformed' });
  }
};
