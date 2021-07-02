const {FORBIDDEN}=require('../services/utils/variableStatus');
const ERROR_ADMIN = {
  error: {
    code: FORBIDDEN,
    message: 'Only admins can register new admins'
  }};
  

const middlewareAdmin = async(req,res,next)=>{
  if(req.tipeUser.role!=='admin'){
    return next(ERROR_ADMIN.error);
  }
  next();
};
module.exports={middlewareAdmin};