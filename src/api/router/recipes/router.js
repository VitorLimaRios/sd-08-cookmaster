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

const upload = require('../../middlewares/multer');

router.post('/recipes', validateJWT, registerRec);

router.get('/recipes', allRec);

router.get('/recipes/:id', idRec);

router.put('/recipes/:id', validateJWT, editRec);

router.delete('/recipes/:id', validateJWT, deleteRec);

router.put('/recipes/:id/image/', validateJWT, upload.single('image'), editRec);

module.exports = router;
