const UsersServices = require('../services/UsersServices');

const CODE_HTTP_CREATE = 201;

const registerUsers = async (req, resp) => {
    const {name, email, password } = req.body;
    const response = await UsersServices.registerUsers({name, email, password});

    if(response.code) return resp.status(response.code).json(response.message);

    resp.status(CODE_HTTP_CREATE).json(response);
}

module.exports = {
    registerUsers,
}
