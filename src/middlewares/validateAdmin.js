const ERRO_403 = 403;

const validateAdmin = async (req, res, next) => {
  const { role } = req.user;

  try {
    if (role !== 'admin') {
      return res.status(ERRO_403).json({
        message: 'Only admins can register new admins',
      });
    }
    
    return next();
  } catch (error) {
    res.status(ERRO_401).json({
      message: 'Erro',
    });
  }
};

module.exports = validateAdmin;
