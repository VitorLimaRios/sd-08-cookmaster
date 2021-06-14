const express = require('express');
const {
  // getAllUsers,
  createUser,
  // getUserById,
  // updateUser,
  // deleteUser
} = require('../controllers/users');

const router = express.Router();

// router.get('/users', getAllUsers);
// router.get('/users/:id', getUserById);
router.post('/users', createUser);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

module.exports = router;
