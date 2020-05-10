const express = require('express');
const collectionService = require('./collections-service');
const helperService = require('../helperService/helperService');
const { requireAuth } = require('../middleware/jwt-auth');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter.route('/').get((req, res, next) => {
  // let launchFlag = req.query.type;
  let payload = helperService.handleToken(req.get('Authorization'));

  console.log(payload);
  collectionService
    .getAllCollections(req.app.get('db'), payload.userId)
    .then((all_collections) => {
      res.status(200).json(collectionService.cleanCollection(all_collections));
    })
    .catch(next);
});

module.exports = collectionRouter;
