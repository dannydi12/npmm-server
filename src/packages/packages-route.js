const express = require('express');
const packagesService = require('./packages-service');

const packagesRouter = express.Router();
const jsonBodyParser = express.json();

packagesRouter.route('/').post(jsonBodyParser, (req, res, next) => {
  const { collectionId, name } = req.body;
  packagesService
    .addPackage(req.app.get('db'), collectionId, name)
    .then((addedPack) => {
      res.status(200).json(addedPack);
    });
});

module.exports = packagesRouter;
