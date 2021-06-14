module.exports = async (error, _req, res, _next) => {
  if (error.err && error.code) {
    return res.status(error.code).json(error.err);
  }
  const code_default = 500;
  console.log(error);
  return res.status(error.code || code_default).
    json(error.message || error.err || { message: 'Unknown error' });
};
