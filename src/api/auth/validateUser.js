const { ObjectId } = require('mongodb');

const Model = require('../../models/RecipeModel');

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params;
    if(!ObjectId.isValid(id)) {
      res.status(error).json({message: 'missing id'});
    }
  
    const result = await Model.getById(id);

    if (ObjectId(result.userId).toString() !== ObjectId(req.user._id).toString()) {
      if(req.user.role === 'admin') {
        return next();
      }
      throw new Error('missing auth token');
    }
    
    next();

  } catch (error) {

    req.error = error.message;
    next();
  }
};
