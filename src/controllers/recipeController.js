const recipesService = require('../services/recipeServices');


const OK = 200;
const BAD_REQUEST = 400;
const ERR_500 = 500;
const NOT_FOUND = 404;

const createRecipes = async (req, res) => {
  const body = req.body;
  const result = await recipesService.createRecipes({...body, _id: req.user._id });
  res.status(result.status).json(result.message);
};

const getAll = async(req,res)=>{
  try {
    const result = await recipesService.getAll();
    res.status(OK).json(result);

  } catch (error) {
    res.status(ERR_500).json({message:'bka'});
        
  }
};

const getOne = async(req,res)=>{
  try {
    const {id}= req.params;
    const result = await recipesService.getOne(id);
    res.status(result.status).json(result.message);
  } catch (error) {

    res.status(NOT_FOUND).json({message:'recipe not found'});
        
  }
};

const update = async(req,res)=>{
  try {
    const recipe = req.body;
    const {id} = req.params;
    const user = req.user;
    const result = await recipesService.update(id,recipe,user);
    res.status(result.status).json(result.message);

  } catch (error) {
    res.status(ERR_500).json(error.message);
        
  }
};

const deleteOne = async(req,res) =>{
  try {
    const {id } = req.params;
    const user = req.user;
    const result = await recipesService.deleteOne(id,user);
    res.status(result.status).json(result.message);
  } catch (error) {
    res.status(BAD_REQUEST).json(error.message);
    
  }
};

const addImage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await recipesService.addImage(id, req.file,req.user);
    res.status(result.status).json(result.message);
  } catch (error) {
    res.status(ERR_500).json(error.message);
  }

};
module.exports = {
  createRecipes,getAll,getOne,update,deleteOne,addImage
}; 
