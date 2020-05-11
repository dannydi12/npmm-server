const express = require('express');
const cliService = require('./cli-service');

const cliRouter = express.Router();
const jsonBodyParser = express.json();

cliRouter.route('/').get((req, res, next) => {
  let email = req.query.email;

  cliService
    .userCollectionsFromEmail(req.app.get('db'), email)
    .then((userId) => {
      res.status(200).json(userId);
    });
});

module.exports = cliRouter;
