class Users {
  create(req, res) {
    const statusCode = 201;
    return res.status(statusCode).json({
      _id: '5f4697be77df66035f61a357',
      name: 'Default User',
      email: 'defaultEmail@email.com',
      password: 'defaultPassword',
      role: 'user',
    });
  }
}

module.exports = Users;
