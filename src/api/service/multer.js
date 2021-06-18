// const multer = require('multer');


// const storage = multer.diskStorage({
//   destination: (req, file, callback) => callback(null, 'uploads/'),
//   filename: (req, file, callback) => {
//     console.log('reqMulter', req);
//     console.log('fileMulter', file);
//     callback(null, `${req.params.id}.jpeg`);
//   }
// });

// const upload = multer({storage});

// module.exports = {
//   upload
// };