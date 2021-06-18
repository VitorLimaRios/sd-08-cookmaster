const {
  INVALID_ENTRIES,
  ALREADY_REGITRED,
  ALL_BE_FILED,
  INCORRECT_ENTRIES,
} = require('../shared/errorMessage');

const {
  HTTP_409_STATUS,
  HTTP_400_STATUS,
  HTTP_401_STATUS,
} = require('../shared/httpTypes');

const { REGEX_EMAIL } = require('../shared/defs');

const useModels = require('../models/user.models');

const verifyEntries = async (req, res, cb) => {
  const { name, email, password } = req.body;

  if (!name || !REGEX_EMAIL.test(email) || !password) {
    return res.status(HTTP_400_STATUS).json({
      message: INVALID_ENTRIES,
    });
  }

  cb();
};

const alreadyExist = async (req, res, cb) => {
  const { email } = req.body;
  const findEmail = await useModels.findOneUserByEmail(email);

  if (findEmail) {
    return res.status(HTTP_409_STATUS).json({
      message: ALREADY_REGITRED,
    });
  }

  cb();
};

const invalidLogin = async (req, res, cb) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(HTTP_401_STATUS).json({
      message: ALL_BE_FILED,
    });
  }

  const userEmail = await useModels.findOneUserByEmail(email);
  const userPassword = await useModels.findOneUserByPassword(password);

  if (!userEmail || !userPassword) {
    return res.status(HTTP_401_STATUS).json({
      message: INCORRECT_ENTRIES,
    });
  }

  cb();
};

module.exports = {
  verifyEntries,
  alreadyExist,
  invalidLogin,
};
