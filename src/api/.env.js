module.exports = {
  api: {
    protocol: 'http',
    hostname: 'localhost',
    port: 3000,
    username: '',
    password: '',
    pathname: '',
    jwt: {
      jwtOptions: {
        algorithm: 'ES256',
        issuer: 'cookmaster-api'
      },
      privateKey: `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIB7uws1Z2+wFVQgJSOvpwGcxsSB4KBhqhzMR4I7DDCOZoAoGCCqGSM49
AwEHoUQDQgAEOmV0/JG68Q34j216K3BmtJvUIi9pAgza/pWVIqP/9FgroJkP48gb
pR6iVPBewrBbW1MK/8GaS2bsbUKi5bK/tg==
-----END EC PRIVATE KEY-----
`, // FOR ES256 SIGN: openssl ecparam -name prime256v1 -genkey -noout -out private-key.pem 
      publicKey: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEOmV0/JG68Q34j216K3BmtJvUIi9p
Agza/pWVIqP/9FgroJkP48gbpR6iVPBewrBbW1MK/8GaS2bsbUKi5bK/tg==
-----END PUBLIC KEY-----
`, // openssl ec -in private-key.pem -pubout -out public-key.pem
    },
  },
  mysqlConnection: {
    host: 'localhost',
    user: '',
    password: '',
    database: 'fill_it_up',
  },
  mongodbConnection: {
    protocol: 'mongodb',
    hostname: 'mongodb',
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
