const frisby = require('frisby');
const { MongoClient } = require('mongodb');

const mongoDbUrl = 'mongodb://localhost:27017/Cookmaster';
const url = 'http://localhost:3000';

const INVALID_ENTRIES = 'Invalid entries. Try again.';
const ALL_FIELDS = 'All fields must be filled';
const INCORRECT = 'Incorrect username or password';
const ONLY_ADMIN = 'Only admins can register new admins';
const BAD = 400;
const UNAUTHORIZED = 401;
const FORBIDDEN = 403;
const CONFLICT = 409;

//USERS
describe('When insert a new user', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = connection.db('Cookmaster');
  });

  beforeEach(async () => {
    await db.collection('users').deleteMany({});
    await db.collection('recipes').deleteMany({});
    const users = {
      name: 'admin', email: 'root@email.com', password: 'admin', role: 'admin' };
    await db.collection('users').insertOne(users);
  });

  afterAll(async () => {
    await connection.close();
  });

  it('Need the name field filled', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          email: 'henriquefogaca@hotmail.com',
          password: 'masterchef02',
        })
      .expect('status', BAD)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(INVALID_ENTRIES);
      });
  });

  it('Need the email field filled', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Henrique Fogaça',
          password: 'masterchef02',
        })
      .expect('status', BAD)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(INVALID_ENTRIES);
      });
  });

  it('Need an actual email in email field', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Henrique Fogaça',
          email: 'henriquefogaca.com',
          password: 'masterchef02',
        })
      .expect('status', BAD)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe(INVALID_ENTRIES);
      });
  });

  it('Cant add more than one email', async () => {
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Henrique Fogaça',
          email: 'henriquefogaca@hotmail.com',
          password: 'masterchef02',
        });
    await frisby
      .post(`${url}/users/`,
        {
          name: 'Paola Carosella',
          email: 'henriquefogaca@hotmail.com',
          password: 'masterchef02',
        })
      .expect('status', CONFLICT)
      .then((response) => {
        const { body } = response;
        const result = JSON.parse(body);
        expect(result.message).toBe('Email already registered');
      });
  });
});
