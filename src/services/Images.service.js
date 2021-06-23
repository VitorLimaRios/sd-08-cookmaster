const path = require('path');

module.exports = {
  path: (image) => {
    const image_path = path.resolve(__dirname, '..', 'uploads', image);

    return image_path;
  }
};