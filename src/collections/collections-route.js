const express = require('express');
const collectionService = require('./collections-service');
const { requireAuth } = require('../middleware/jwt-auth');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    let type = req.query.type;

    collectionService
      .getAllCollections(req.app.get('db'), req.payload.sub, type)
      .then((all_collections) => {
        res
          .status(200)
          .json(collectionService.cleanCollection(all_collections));
      })
      .catch(next);
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { name, isLaunchPad } = req.body;
    const user_id = req.payload.sub;
    collectionService
      .addCollection(req.app.get('db'), name, user_id, isLaunchPad)
      .then((collection) => {
        res.status(201).json(collection);
      });
  });

collectionRouter
  .route('/:collectionId')
  .all(requireAuth)
  .get((req, res, next) => {
    const { justNames } = req.query;
    const { collectionId } = req.params;

    if (justNames === 'true') {
      return collectionService
        .getPackagesByCollection(req.app.get('db'), collectionId)
        .then((packs) => {
          // {
          //   name:
          //   packages:
          // }
          return res.json(packs);
        });
    }

    collectionService
      .getPackagesByCollection(req.app.get('db'), collectionId)
      .then((collection) => {
        const names = collection.map((set) => set.name);
        collectionService.npmsAPI(names).then((data) => {
          return res.json(data.filter((element) => element != null));
        });
      });
  })
  .patch(requireAuth, jsonBodyParser, (req, res) => {
    const { collectionId } = req.params;
    const { name, isLaunchPad } = req.body;
    collectionService
      .updateCollection(req.app.get('db'), collectionId, name, isLaunchPad)
      .then((collection) => {
        res.status(200).json(collection);
      });
  })
  .delete(requireAuth, (req, res) => {
    const { collectionId } = req.params;
    collectionService
      .deleteCollection(req.app.get('db'), collectionId)
      .then((result) => {
        res.status(204).end();
      });
  });

module.exports = collectionRouter;
