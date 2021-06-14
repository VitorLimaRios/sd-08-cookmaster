const { USERS } = require('./constants');
const { addNew, getByKeysValues } = require('./functions');

const addUser = async(name, email) => {
  const role = 'user';
  return await addNew({ name, email, role }, USERS);
};

const getUserbyEmail = async(email) => (
  await getByKeysValues({email}, USERS)
);

module.exports = {
  addUser,
  getUserbyEmail,
};
