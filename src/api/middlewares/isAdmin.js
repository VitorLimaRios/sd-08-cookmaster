module.exports = (req, _res, next) => {
  const { role } = req.resource;
  console.log(req.resource);
  console.log(role);
  if (role !== 'admin') next({
    code: 'forbidden', message: 'Only admins can register new admins' });
  req.body.role = 'admin';
  next();
};
