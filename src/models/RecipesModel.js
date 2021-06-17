const connection = require('./connection');
const { ObjectID } = require('mongodb');

const finUserEmail = async (email) => {
    try {
        const response = await connection().then((db) => db.collection('users').find({ email: email }).toArray());
        return response;
    } catch (error) {
        console.log(error);
    }
}

const insertRecipe = async ({ name, ingredients, preparation, userId }) => {
    try {
        const response = await connection().then((db) => db.collection('recipes')
            .insert({ name, ingredients, preparation, userId }));
        return response.ops[0];

    } catch (error) {
        console.log(error);
    }

};

const getRecipes = async () => {
    try {
        const response = await connection().then((db) => db.collection('recipes')
            .find().toArray());
        return response;
    } catch (error) {
        console.log(error);
    }
};

const getRecipeID = async (id) => {
    try {
        const response = await connection().then((db) => ObjectID(id) ? db.collection('recipes')
            .find({_id: ObjectID(id)}).toArray(): false);
        return response;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    finUserEmail,
    insertRecipe,
    getRecipes,
    getRecipeID,
}
