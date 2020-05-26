const express = require('express');
const bcrypt = require('bcryptjs');
const usersService = require('./users-service');
const collectionService = require('../collections/collections-service');
const packageService = require('../packages/packages-service');
const AuthService = require('../auth/auth-service');

const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required field' });
  }
  const saltedPass = bcrypt.hashSync(password, 11);

  let sub;
  const payload = { email: `${email}` };

  return usersService
    .registerUser(req.app.get('db'), email, saltedPass)
    .then((idResponse) => {
      if (!idResponse) {
        return res.status(400).json({ error: 'issue with creating new user' });
      }
      sub = `${idResponse}`;
      return collectionService
        .addCollection(req.app.get('db'), 'Favorites', idResponse)
        .then((added) =>
          packageService
            .addPackage(req.app.get('db'), added.id, 'npmm')
            .then(() =>
              res
                .status(200)
                .send({ authToken: AuthService.createJwt(sub, payload) })
            )
        );
    })
    .catch(next);
});

module.exports = usersRouter;
