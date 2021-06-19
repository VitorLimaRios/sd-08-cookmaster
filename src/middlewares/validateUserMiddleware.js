const status = require('../statuscode/status');

const validateall = (req, res, next) =>{
  const {name, password, email} = req.body;
  if(!name || !password || !email) {
    return res.status(status.BAD_REQUEST).json({message: status.INVALID_ENTRIES});
  }
  next();
};

module.exports ={
  validateall,
};