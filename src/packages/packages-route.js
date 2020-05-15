const express = require('express');
const packagesService = require('./packages-service');
const { requireAuth } = require('../middleware/jwt-auth');
const packagesRouter = express.Router();
const jsonBodyParser = express.json();

packagesRouter
  .route('/')
  .all(requireAuth)
  .post(jsonBodyParser, (req, res, next) => {
    const { collectionId, name } = req.body;
    packagesService
      .checkIfPackageExists(req.app.get('db'), collectionId, name)
      .then((pack) => {
        if (pack.length > 0) {
          res.error('package exists!');
        }
      });

    packagesService
      .addPackage(req.app.get('db'), collectionId, name)
      .then((addedPack) => {
        return res.status(200).json(addedPack);
      })
      .catch(next);
  });

packagesRouter
  .route('/:packageId')
  .all(requireAuth)
  .delete((req, res, next) => {
    const { packageId } = req.params;

    packagesService
      .deletePackage(req.app.get('db'), packageId)
      .then((deleted) => {
        return res.status(204).end();
      })
      .catch(next);
  });

module.exports = packagesRouter;
