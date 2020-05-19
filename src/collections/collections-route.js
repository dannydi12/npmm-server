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

    if (!name) {
      return res.status(400).send({ error: 'missing required field' });
    }

    let collectionTest = async () => {
      const check = await collectionService.checkIfCollectionExists(
        req.app.get('db'),
        user_id,
        name
      );

      if (check.length > 0) {
        return res.status(400).end();
      } else {
        collectionService
          .addCollection(req.app.get('db'), name, user_id)
          .then((collection) => {
            return res.status(201).json(collection);
          })
          .catch(next);
      }
    };
    collectionTest();
  });

collectionRouter
  .route('/:collectionId')
  .all(requireAuth)
  .get((req, res, next) => {
    const { justNames, offset } = req.query;
    const { collectionId } = req.params;

    if (!Number(collectionId)) {
      return res.status(400).send({ error: 'invalid query' });
    }

    if (justNames === 'true') {
      return collectionService
        .getPackagesByCollection(req.app.get('db'), collectionId, false)
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
    collectionName().then((name) =>
      name ? (nameOfCollection = name.collection_name) : null
    );

    collectionService
      .getPackagesByCollection(req.app.get('db'), collectionId, offset)
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
  .patch(jsonBodyParser, (req, res, next) => {
    const { collectionId } = req.params;
    let { name } = req.body;
    name = name.trim();

    if (!Number(collectionId)) {
      return res.status(400).send({ error: 'invalid query' });
    }

    if (!name) {
      return res.status(400).send({ error: 'missing required field' });
    }

    if (name.length === 0) {
      return res.status(400).send({ error: 'required field empty' });
    }

    collectionService
      .updateCollection(req.app.get('db'), collectionId, name)
      .then((collection) => {
        return res.status(200).json(collection);
      })
      .catch(next);
  })
  .delete((req, res, next) => {
    const { collectionId } = req.params;

    if (!Number(collectionId)) {
      return res.status(400).send({ error: 'invalid parameter' });
    }

    collectionService
      .deleteCollection(req.app.get('db'), collectionId)
      .then((result) => {
        return res.status(204).end();
      })
      .catch(next);
  });

module.exports = collectionRouter;
