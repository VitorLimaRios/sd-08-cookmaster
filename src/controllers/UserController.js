const msg = require('../validators/ErrorMessages');
const UserService = require('../services/UserService');
module.exports = {
  addUser: async (req, res) => {
    const entries = await UserService.verifyEntries(req);
    if (entries) {
      return res.status(entries.code).json({ message: entries.message });
    }
    const notUnique = await UserService.verifyUnicity(req.body.email);
    if (notUnique) {
      return res.status(notUnique.code).json({ message: notUnique.message });
    }
    const user = await UserService.addUser(req.body);
    res.status(msg.status.created).json({ user });
  },
  login: async (req, res) => {
    const entries = await UserService.verifyEntries(req);
    if (entries) {
      return res.status(entries.code).json({ message: entries.message });
    }
    const { email, password } = req.body;
    const dataLogin = await UserService.verifyLoginData(email, password);
    if (dataLogin) {
      return res.status(dataLogin.code).json({ message: dataLogin.message });
    }
    const result = await UserService.generateToken(req.body);
    return res.status(result.code).json({ token: result.token });
  },
};
