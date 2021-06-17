// Users && Recipes

const validateEntries = {
    code: 400,
    message: {
        message: "Invalid entries. Try again."
    }
}

const emailAlreadyRegistered = {
    code: 409,
    message: {
        message: "Email already registered"
    }
}

const recipeNotFound = {
    code: 404,
    message: {
        message: "recipe not found"
    }
}

// Login

const fieldsMustBeFilled = {
    code: 401,
    message: {
        message: "All fields must be filled"
    }
}

const IncorrectFields = {
    code: 401,
    message: {
        message: "Incorrect username or password"
    }
}

module.exports = {
    validateEntries,
    emailAlreadyRegistered,
    fieldsMustBeFilled,
    IncorrectFields,
    recipeNotFound,
}