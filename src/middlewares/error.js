const INTERNAL_SERVER_ERROR = 500;

module.exports = (err, _req, res, _next) => {
  const { status, message} = err;

  return status
    ? res.status(status).json({ message })
    : res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
};
