const rescue = require('express-rescue');
const path = require('path');

const SUCCEEDED = 200;

module.exports = rescue(async (req, res) => {
  const { id: idWithExtension } = req.params;
  // console.log(idWithExtension);
  const imagePath = path.resolve(__dirname, `../uploads/${idWithExtension}`);
  // console.log(imagePath);
  return res.status(SUCCEEDED).sendFile(imagePath);
});
