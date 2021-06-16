const express = require('express');
const router = express.Router();

const validateJWT = require('../../middlewares/jwt/validateJwt');

const {
  registerRec,
  allRec,
  idRec,
  editRec,
  deleteRec,
} = require('../../controllers/recipes/recipes');

router.post('/recipes', validateJWT, registerRec);

router.get('/recipes', allRec);

router.get('/recipes/:id', idRec);

router.put('/recipes/:id', validateJWT, editRec);

router.delete('/recipes/:id', validateJWT, deleteRec);

module.exports = router;
