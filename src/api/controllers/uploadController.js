const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = require('../config/multerConfig');

const upload = multer({storage});

const uploadMax = 5;
const STATUS_OK = 200;

router.post('/', upload.array('file', uploadMax), (req, res) =>
  res.send({message: 'arquivo recebido'}).status(STATUS_OK)
);

module.exports = router;
