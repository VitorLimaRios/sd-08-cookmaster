const express = require('express');
const bodyParser = require('body-parser');
const user = require('../../controllers/user');
const loginController = require('../../controllers/login');

const errorMiddleware = require('../../controllers/error');

const app = express();

app.use(bodyParser.json());

app.get('/', (_request, response) => {
  response.send();
});

//Listar todos os usuários
app.get('/users', user.getAllUsers );
// Criar usuário
app.post('/users', user.createUsers);
//Criar login
app.post('/login', loginController);
// //Atualizar produtos
// app.put('/products/:id', products.updateProduct);
// //Deletando produtos
// app.delete('/products/:id', products.deleteProduct);

// //Listar todas as vendas
// app.get('/sales', sales.getAllSales );
// //Procurar por ID
// app.get('/sales/:id', sales.getById);
// // Criar vendas
// app.post('/sales', sales.createSales);
// //Atualizar vendas
// app.put('/sales/:id', sales.updateSale);
// //Deletando produtos
// app.delete('/sales/:id', sales.deleteSale);

app.use(errorMiddleware);

module.exports = app;