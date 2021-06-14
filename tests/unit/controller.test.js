// const { expect } = require('chai');
// const sinon = require('sinon');

// const ControllerUsers = require('../../src/controllers/users');

// describe('Controllers:Users', () => {
//   const defaultUser = {
//     _id: '5f4697be77df66035f61a357',
//     name: 'Default User',
//     email: 'defaultEmail@email.com',
//     password: 'defaultPassword',
//     role: 'user',
//   };
  
//   describe('create() user', () => {
//     let status, json, res, req, controllerUsers;
//     beforeEach(() => {
//       req = {};
//       status = sinon.stub();
//       json = sinon.spy();
//       res = { json, status };
//       status.returns(res);
//       controllerUsers = new ControllerUsers();
//     });
//     it('return um new user', async () => {
//       controllerUsers.create(req, res);      
//       expect(status.calledOnce).to.be.true;
//       expect(status.calledWith(201)).to.be.true;
//       expect(json.calledOnce).to.be.true;
//       expect(json.calledWith(defaultUser)).to.be.true;
//     });
//   });
// });
