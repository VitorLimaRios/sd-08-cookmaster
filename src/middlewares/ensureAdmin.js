const FORBIDDEN = 403;

module.exports = async (req, res, next) => {
  const { role } = req.user;

  if(role !== 'admin') {
    return res.status(FORBIDDEN).json({ message: 'Only admins can register new admins' });
  }

  next();
};