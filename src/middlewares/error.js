module.exports = async (error, _req, res, _next) => {
  if (error.message && error.code) {
    return res.status(error.code).json({ message: error.message });
  }
  const code_default = 500;
  console.log(error);
  return res.status(error.code || code_default).
    json({ message: error.message || 'Unknown error' });
};