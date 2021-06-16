const Users = require('../services/userServices');

const OK = 200;

const ERR_500 =500;


const create = async(req,res)=>{
  try {
    const body = req.body;
    const result = await Users.create(body);
    res.status(result.code).json(result.message);
  } catch (error) {
    res.status(ERR_500).json({errCode:error.message});
    
  }
};
const login = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const result = Users.login(email,password);
    res.status(OK).json(result);
  } catch (error) {
    res.status(ERR_500).json({message:'deu ruim'});
  }
}; 

module.exports = {create,login};