const user = require('../models/user');

const CREATED = 201;
const FORBIDDEN = 403;

const post = async (req, res) => {
  const { role: userRole } = req;
  const { name, email, password } = req.body;
  try {
    if (userRole != 'admin') throw new Error;

    let { role } = req.body;
    if (!role) role = 'admin';
    const userObject = await user.create(name, email, password, role);
    delete userObject.ops[0]['password'];
    res.status(CREATED).json(
      {
        'user': userObject.ops[0]
      }
    );

  } catch (err) {
    res.status(FORBIDDEN).json({
      'message': 'Only admins can register new admins'
    });
  }
};

module.exports = {
  post,
};
