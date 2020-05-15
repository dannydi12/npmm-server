const express = require('express');
const collectionService = require('./collections-service');
const { requireAuth } = require('../middleware/jwt-auth');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    collectionService
      .getAllCollections(req.app.get('db'), req.payload.sub)
      .then((all_collections) => {
        res
          .status(200)
          .json(collectionService.cleanCollection(all_collections));
      })
      .catch(next);
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { name } = req.body;
    const user_id = req.payload.sub;
    collectionService
      .addCollection(req.app.get('db'), name, user_id)
      .then((collection) => {
        res.status(201).json(collection);
      })
      .catch(next);
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
          return res.json(packs);
        });
    }

    let collectionName = async () =>
      await collectionService.getCollectionName(
        req.app.get('db'),
        collectionId
      );

    let nameOfCollection;
    collectionName().then((name) => (nameOfCollection = name.collection_name));

    collectionService
      .getPackagesByCollection(req.app.get('db'), collectionId)
      .then((collection) => {
        const names = collection.map((set) => set.name);
        const ids = collection.map((set) => set.id);

        collectionService.npmsAPI(names).then((data) => {
          for (let i in data) {
            data[i]['id'] = ids[i];
          }
          return res.json({
            name: nameOfCollection,
            packs: data.filter((element) => element != null),
          });
        });
      })
      .catch(next);
  })
  .patch(requireAuth, jsonBodyParser, (req, res) => {
    const { collectionId } = req.params;
    const { name } = req.body;
    collectionService
      .updateCollection(req.app.get('db'), collectionId, name)
      .then((collection) => {
        res.status(200).json(collection);
      })
      .catch(next);
  })
  .delete(requireAuth, (req, res) => {
    const { collectionId } = req.params;
    collectionService
      .deleteCollection(req.app.get('db'), collectionId)
      .then((result) => {
        res.status(204).end();
      })
      .catch(next);
  });

module.exports = collectionRouter;
