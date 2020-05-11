const express = require('express');
const userService = require('./user-service');
const AuthService = require('../auth/auth-service');
const bcrypt = require('bcryptjs');

const userRouter = express.Router();
const jsonBodyParser = express.json();

userRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  let { email, password } = req.body;

  let saltedPass = bcrypt.hashSync(password, 3);

  let sub;
  let payload = { email: `${email}`, password: `${saltedPass}` };

  userService
    .registerUser(req.app.get('db'), email, saltedPass)
    .then((idResponse) => {
      sub = `${idResponse[0]}`;
      res.status(200).send({ authToken: AuthService.createJwt(sub, payload) });
    });
});

module.exports = userRouter;
