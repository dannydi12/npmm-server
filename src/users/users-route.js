const express = require('express');
const usersService = require('./users-service');
const collectionService = require('../collections/collections-service');
const AuthService = require('../auth/auth-service');
const bcrypt = require('bcryptjs');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required field' });
  }
  let saltedPass = bcrypt.hashSync(password, 11);

  let sub;
  let payload = { email: `${email}` };

  usersService
    .registerUser(req.app.get('db'), email, saltedPass)
    .then((idResponse) => {
      sub = `${idResponse}`;
      return collectionService
        .addCollection(req.app.get('db'), 'Favorites', idResponse)
        .then((added) => {
          return res
            .status(200)
            .send({ authToken: AuthService.createJwt(sub, payload) });
        });
    })
    .catch(next);
});

module.exports = usersRouter;
