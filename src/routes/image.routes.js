const router = require('express').Router();

const useController = require('../controllers/image.controllers');

router.get('/:id', useController.findImage);

module.exports = router;
