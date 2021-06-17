const jwt = require('jsonwebtoken');
const RecipesModel = require('../models/RecipesModel');

const keySectret = '123456';

const validateJWT = async (req, resp, next) => {
    const token = req.headers.authorization;

    if(!token) return resp.status(401).json({ message: "Token não encontrado!"});

    try {
        const decode = jwt.verify(token, keySectret);
        const { email } = decode.data;

        const user = await RecipesModel.finUserEmail(email);

        if(user.length === 0) return resp.status(404).json({message: "Usuario não existe"});

        req.user = user[0];
    } catch (err) {
        return resp.status(401).json({ message: err.message });
    }
    next();
} 

module.exports = {
    validateJWT,
}