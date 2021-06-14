const fs = require('fs');
const path = require('path');

const OK_STATUS = 200;

const getImage = (req, res) => {
  const { filename } = req.params;
  const filePath = path.resolve( 'src/uploads', filename);
  return res.status(OK_STATUS).sendFile(filePath);
};

module.exports = getImage;
