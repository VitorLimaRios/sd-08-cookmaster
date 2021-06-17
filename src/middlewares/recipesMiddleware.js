const errors = {
  invalid_entries: 'Invalid entries. Try again.',
  malformed: 'jwt malformed'
}
const BAD_REQUEST = 400;
const UNAUTHORIZED = 401;
const INTERNAL_ERROR = 500;
const TOKEN_LENGTH = 233;

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
    res.status(INTERNAL_ERROR).json({ message: 'Hmm, e agora?' })
  }
  next();
};

module.exports = {
  validateEntries,
  validateMalformedToken
}
