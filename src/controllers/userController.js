const userService = require('../services/userService');
const status = require('../statuscode/status');

const addUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const result = await userService.addUser(name, email, password);
    // console.log(result);
    if (result !== null) {
      return res.status(status.CREATE).json({ user: result });
    }
  } catch (err) {
    console.error(err);
    return res.status(status.INTERNAL_SERVER_ERROR).send({error: Message.err});
  }

};

module.exports = {
  addUser,
};