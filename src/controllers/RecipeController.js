const Service = require('../services/RecipeService');

const httpCreateSuccess = 201;
const httpSuccess = 200;
const error = 401;

const create = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const userId = req.user._id;
    const result = await Service.create({name, ingredients, preparation, userId});
    const recipe = {
      ...result,
      userId: req.user._id
    };

    res.status(httpCreateSuccess).json({recipe});
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});   
  }
};


const getAll = async (req, res) => {
  const result = await Service.getAllRecipes();
  res.status(httpSuccess).json(result);
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Service.getById(id);
    res.status(httpSuccess).json(result);
  } catch (error) {
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});  
  }
};

const updateById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    // const result = await Service.getById(id);

    // if(result.userId !== req.user.id && req.user.role !== 'admin') {
    //   throw new Error(JSON.stringify({
    //     status: 401,
    //     message: 'missing auth token'
    //   }));
    // }

    await Service.updateById(id, name, ingredients, preparation);
    const newResult = await Service.getById(id);

    res.status(httpSuccess).json(newResult);
  } catch (error) {
    console.log(error);
    // const data = JSON.parse(error.message);
    // res.status(data.status).send({message: data.message});
  }
};

module.exports = {
  create,
  getAll,
  getById,
  updateById
};
