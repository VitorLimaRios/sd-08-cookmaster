const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');



router.get('/', async(req, res) => {
  res.send('get');
});
router.post('/', async(req, res) => {
  res.send('post');
});
router.put('/', async(req, res) => {
  res.send('put');
});
router.delete('/', async(req, res) => {
  res.send('delete');
});




module.exports = router;