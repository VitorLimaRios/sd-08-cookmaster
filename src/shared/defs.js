const REGEX_EMAIL = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const URL_MONGODB_LOCAL = 'mongodb://127.0.0.1:27017//';
const URL_MONGODB_EVALUATION = 'mongodb://mongodb:27017/Cookmaster';
const NAME_OF_DATABASE = 'Cookmaster';
const OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  REGEX_EMAIL,
  URL_MONGODB_LOCAL,
  URL_MONGODB_EVALUATION,
  NAME_OF_DATABASE,
  OPTIONS,
};
