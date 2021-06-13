const status = require('./status');

module.exports = (err, _req, res, _next) => {
  if (err.message && err.status) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(status.ERRO).json({ message: 'Faltou message ou status no erro' });
};