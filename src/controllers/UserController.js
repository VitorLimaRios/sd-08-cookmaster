const Service = require('../services/UserService');

const httpCreateSuccess = 201;
const httpsNotSuccess = 400;

const create = async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    const result = await Service.create({name, email, password, role});
    const { password: pass, ...otherInfo} = result;
    res.status(httpCreateSuccess).json({user: otherInfo});

  } catch (error) {
    console.log(error);
    const data = JSON.parse(error.message);
    res.status(data.status).send({message: data.message});   
  }
};

module.exports = {
  create,
};
