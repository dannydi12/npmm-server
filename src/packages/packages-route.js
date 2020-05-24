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

    if ((!collectionId, !name)) {
      return res.status(400).json({ error: 'missing required field' });
    }
    if (!Number(collectionId)) {
      return res.status(400).json({ error: 'invalid input' });
    }

    return packagesService
      .checkIfPackageExists(req.app.get('db'), collectionId, name)
      .then((pack) => {
        if (pack.length > 0) {
          return res.status(400).json({ error: 'package exists' });
        }
        return packagesService
          .addPackage(req.app.get('db'), collectionId, name)
          .then((addedPack) => res.status(200).json(addedPack))
          .catch(next);
      });
  });

packagesRouter
  .route('/:packageId')
  .all(requireAuth)
  .delete((req, res, next) => {
    const { packageId } = req.params;

    if (!Number(packageId)) {
      return res.status(400).send({ error: 'invalid input' });
    }

    return packagesService
      .deletePackage(req.app.get('db'), packageId)
      .then(() => res.status(204).end())
      .catch(next);
  });

module.exports = packagesRouter;
