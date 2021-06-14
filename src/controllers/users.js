const usersService =  require('../service/users');

const STATUS_201 = 201;
const STATUS_409 = 409;

// CREATE USER
const create = async (req, res) => {
  const { name, email, password } = req.body;  
  const newUser = await usersService.create(name, email, password);
  if (newUser) {
    return res.status(STATUS_201).json(newUser);
  } else { return res.status(STATUS_409).json({      
    message: 'Email already registered',
  });
  }
};




module.exports = {
  create,
};
