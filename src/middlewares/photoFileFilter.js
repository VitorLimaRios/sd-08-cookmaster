const photoFileFilter = (req, file, callback) => {
  // console.log(req.file.mimetype);
  // if (req.file.mimetype !== 'image/jpg') {
  //   req.fileValidationError = true;

  //   //Rejects the file
  //   return callback(null, false);
  // }

  //Accepts the file
  callback(null, true);
};

module.exports = photoFileFilter;
