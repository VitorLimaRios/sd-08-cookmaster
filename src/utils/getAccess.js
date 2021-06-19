const getAccess = async (recipe, user) => {
  const { userId, role } = user;

  if (String(recipe.userId) === userId || role === 'admin') return true;

  return false;
};

module.exports = getAccess;
