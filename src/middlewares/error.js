module.exports = (err, req, res, next) => {
  console.log('oi');
  if (err) {
    console.log('err');
    res.status(422).json({
      error: { message: 'err.details[0].message' },
    });
    console.log('oi');
  }
  console.log('oi');
  // if (err.statusCode) {
  //   return res.status(err.statusCode).json({
  //     error: { message: err.message },
  //   });
  // }

  // console.error(err);

  // return res.status(500).json({
  //   error: {
  //     message: `Internal server error: ${err.message}`,
  //   },
  // });
};
