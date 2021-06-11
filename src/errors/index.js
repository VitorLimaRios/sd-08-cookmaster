// Solution found on https://www.youtube.com/watch?v=qHfZxpRqxYw by Otávio Miranda

class Error400 extends Error {
  constructor(message) {
    super(message);
    this.code = 400;
  }
}

class Error401 extends Error {
  constructor(message) {
    super(message);
    this.code = 401;
  }
}

class Error409 extends Error {
  constructor(message) {
    super(message);
    this.code = 409;
  }
}

module.exports = {
  Error400,
  Error401,
  Error409,
};
