const RecipeModel = require('../api/models/recipeModel');
const ErrorMessages = require('../api/messages/errorMessages');
const StatusCode = require('../api/messages/statusCodeMessages');
const CustomError = require('../error/customError');

const checkIfUserIsOwnerRecipeOrAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { _id, role } = req.user;
    const { userId } = await RecipeModel.findById(id);

    if (String(_id) !== String(userId) && role !== 'admin') {
      throw new CustomError(
        ErrorMessages.invalidJwt,
        StatusCode.UNAUTHORIZED,
      );
    }

    next();
  } catch (error) {
    const { message, code } = error;
    res
      .status(code)
      .json({ message });
  }
};

module.exports = { checkIfUserIsOwnerRecipeOrAdmin };
