const SendImage = require('../services/SendImage');

const OK = 200;

const SendImageMiddleware = async (req, res) => {
  const { user } = req;
  const { id } = req.params;
  const { path } = req.file;

  const imageFullPath = `localhost:3000/${path}`;

  const updatedRecipe = await SendImage({ id, user, image: imageFullPath });

  // case updatedRecipe = undefined not evaluated

  return res.status(OK).json(updatedRecipe);
};

module.exports = SendImageMiddleware;