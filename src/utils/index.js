const isAllowed = (userId, recipeUserId, role) => {
  if(userId === recipeUserId || role === 'admin') return true;
  return false;
};

const auth = (err, decode) => {
  if(err) {
    err.message = 'jwt malformed';
    err.statusCode = 401;
    throw err;
  };
  return decode;
};



module.exports = {
  isAllowed,
  auth
};
