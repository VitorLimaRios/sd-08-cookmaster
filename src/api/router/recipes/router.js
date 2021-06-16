const express = require('express');
const router = express.Router();

const validateJWT = require('../../middlewares/jwt/validateJwt');

const {
  registerRec,
  allRec,
  idRec,
  editRec,
} = require('../../controllers/recipes/recipes');

router.post('/recipes', validateJWT, registerRec);

router.get('/recipes', allRec);

router.get('/recipes/:id', idRec);

router.put('/recipes/:id', validateJWT, editRec);

module.exports = router;
