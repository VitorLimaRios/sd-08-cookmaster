const chai = require('chai');
const sinon = require('sinon');
const getConnection = require('./connectionMock');
const chaiHttp = require('chai-http');
const server = require('../api/app');
const { MongoClient } = require('mongodb');
const { expect } = chai;

chai.use(chaiHttp);

let connectionMock;

describe('Rota POST/api/users', async () => {

    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
    });

    describe('Criando usuario', () => {
        let response;

        before(async () => {
            response = await chai.request(server)
                .post('/users')
                .send({
                    name: 'user',
                    email: 'user@email.com',
                    password: '12345'
                });
              
        });

        it('Retorna status 201', () => {
            expect(response).to.have.status(201);
        });

        
    })

    describe('Criando usuario com dados invalidos', () => {
        let response;

        before(async () => {
            response = await chai.request(server)
                .post('/users')
                .send({
                    name: 'user',
                    password: '12345'
                });
              
        });
        it('Retorna status 400 ', () => {
           // console.log(response)
            expect(response).to.have.status(400);

        });
        it('Retorna messagem Invalid entries ', () => {
            // console.log(response)
             expect(response.body.message).to.be.a.equals('Invalid entries. Try again.')
             
         });

         describe('Tentando cadastrar com email ja existente',()=>{
            let response2;

            before(async () => {
                response2 = await chai.request(server)
                    .post('/users')
                    .send({
                        name: 'user',
                        email: 'user@email.com',
                        password: '12345'
                    });
                  
            });
            it('Retorna messagem Email already registered',()=>{
                expect(response2.body.message).to.be.a.equals('Email already registered')
            })

         })


    });

});

describe('Rota POST/login', async () => {
    before(async () => {
        connectionMock = await getConnection();
        sinon.stub(MongoClient, 'connect').resolves(connectionMock);
    });

    after(async () => {
        MongoClient.connect.restore();
    });

    describe('Login com usuario existente',()=>{
        let response;
        before(async () => {
            await chai.request(server)
                .post('/users')
                .send({
                    name: 'user',
                    email: 'user@email.com',
                    password: '12345'
                });
            response = await chai.request(server)
                .post('/login')
                .send({
                    email: 'user@email.com',
                    password: '12345'
                });
              
        });
        it('Retorn um token',()=>{
            
            expect(response.body).to.a.property('token')
        })
        
    })

    describe('Login com usuario inexistente',()=>{
        let response;
        before(async () => {            
        response = await chai.request(server)
                .post('/login')
                .send({
                    email: 'user@email',
                    password: '12345'
                });
              
        });
        it('Retorna messagem Incorrect username or password',()=>{
            //console.log(response)
            expect(response.body).to.a.property('message')
            expect(response.body.message).to.be.equals('Incorrect username or password')
        })

    })
    describe('Login com usuario inexistente',()=>{
        let response;
        before(async () => {            
        response = await chai.request(server)
                .post('/login')
                .send({
                    email: 'test@gmail.com',
                    password: '123458'
                });
              
        });
        it('Retorna messagem Incorrect username or password',()=>{
            //console.log(response)
            expect(response.body).to.a.property('message')
            expect(response.body.message).to.be.equals('Incorrect username or password')
        })

    })


});