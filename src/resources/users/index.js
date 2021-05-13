const { UserMemoryRepository } = require('./user.memory.repository');
const { UserService } = require('./user.service');
const { UserController } = require('./user.controller');
const { createUserRouter } = require('./user.router');

module.exports =  {
  UserMemoryRepository,
  UserService,
  UserController,
  createUserRouter,
}