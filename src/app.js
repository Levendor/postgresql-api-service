const express = require('express');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
// const { createUserRouter } = require('./resources/users/user.router');
// const { UserController } = require('./resources/users/user.controller');
// const { UserService } = require('./resources/users/user.service');
const { createUserRouter, UserController, UserService, UserMemoryRepository } = require('./resources/users/index.js');

module.exports.createApp = () => {
  const app = express();
  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  
  app.use(cors());

  app.use(express.json());
  
  app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  
  app.use('/', (req, res, next) => {
    if (req.originalUrl === '/') {
      res.send('Service is running!');
      return;
    }
    next();
  });
  
  app.use('/users', createUserRouter(new UserController(new UserService(new UserMemoryRepository))));

  return app;
}
