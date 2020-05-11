const express = require('express');
const usersService = require('./users-service');
const AuthService = require('../auth/auth-service');
const bcrypt = require('bcryptjs');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  let { email, password } = req.body;

  let saltedPass = bcrypt.hashSync(password, 11);

  let sub;
  let payload = { email: `${email}` };

  usersService
    .registerUser(req.app.get('db'), email, saltedPass)
    .then((idResponse) => {
      sub = `${idResponse}`;
      res.status(200).send({ authToken: AuthService.createJwt(sub, payload) });
    });
});

module.exports = usersRouter;
