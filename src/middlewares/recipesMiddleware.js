const errors = {
  invalid_entries: 'Invalid entries. Try again.',
  malformed: 'jwt malformed',
  message: 'recipe not found',
};

const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const NOT_FOUND = 404;
const INTERNAL_ERROR = 500;
const TOKEN_LENGTH = 233;
const ID_LENGTH = 24;

const validateEntries = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(BAD_REQUEST).json({ message: errors.invalid_entries  });
  }
  next();
};

const validateMalformedToken = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (token.length < TOKEN_LENGTH) {
      return res.status(UNAUTHORIZED).json({ message: errors.malformed });
    }
  } catch (err) {
    res.status(INTERNAL_ERROR).json({ message: 'Hmm, e agora?' });
  }
  next();
};

const verifyId = async (req, res, next) => {
  const { id } = req.params;
  if (id.length < ID_LENGTH) {
    return res.status(NOT_FOUND).json({ message: errors.message });
  }
  next();
};

module.exports = {
  validateEntries,
  validateMalformedToken,
  verifyId,
};