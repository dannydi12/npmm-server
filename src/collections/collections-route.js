const express = require('express');
const collectionService = require('./collections-service');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter.route('/').get((req, res, next) => {
  collectionService
    .getAllCollections(req.app.get('db'))
    .then((all_collections) => {
      res.status(200).json(collectionService.cleanCollection(all_collections));
    })
    .catch(next);
});

module.exports = collectionRouter;
