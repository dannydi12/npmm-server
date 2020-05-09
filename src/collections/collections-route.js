const express = require('express');
const collectionService = require('./collections-service');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter.route('/').get((req, res, next) => {
  let id = req.query.userId;

  collectionService
    .getAllCollections(req.app.get('db'), id)
    .then((user_collections) => {
      res.status(200).json(user_collections);
    })
    .catch(next);
});

module.exports = collectionRouter;
