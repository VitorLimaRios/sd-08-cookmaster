module.exports = {
  api: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    username: '',
    password: '',
    pathname: '',
  },
  mysqlConnection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'fill_it_up',
  },
  mongodbConnection: {
    protocol: 'mongodb',
    hostname: 'localhost',
    port: '27017',
    username: '',
    password: '',
    database: 'Cookmaster', // fill it!
    search: 'retryWrites=true&w=majority',
  },
  resources: {
    Users: {
      singular: 'user',
      basePath: 'users',
      tableOrCollec: 'users',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
    Login: {
      singular: 'login',
      basePath: 'login',
      tableOrCollec: 'login',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
    Recipes: {
      singular: 'recipe',
      basePath: 'recipes',
      tableOrCollec: 'recipes',
      insertMocks: [ //insert at least two examples
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
        {
          key1: 'value1',
          key2: 'value2',
          key3: 'value3',
          key4: 'value4',
        },
      ],
    },
  },
};
