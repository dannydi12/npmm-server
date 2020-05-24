const express = require('express');
const collectionService = require('./collections-service');
const { requireAuth } = require('../middleware/jwt-auth');

const collectionRouter = express.Router();
const jsonBodyParser = express.json();

collectionRouter
  .route('/')
  .all(requireAuth)
  .get((req, res, next) => {
    if (req.url !== '/') {
      return res.status(400).json({ error: 'NO PARAMS HERE' });
    }
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
      return res.status(400).json({ error: 'missing required content' });
    }
    if (name.trim().length === 0) {
      return res.status(400).json({ error: 'empty string in request body' });
    }

    collectionService
      .checkIfCollectionExists(req.app.get('db'), user_id, name)
      .then((check) => {
        if (check.length > 0) {
          return res.status(400).end();
        }
        collectionService
          .addCollection(req.app.get('db'), name, user_id)
          .then((collection) => res.status(201).json(collection))
          .catch(next);
      });
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
        .getAllPackages(req.app.get('db'), collectionId)
        .then((packs) => res.json(packs));
    }

    const collectionName = async () => await collectionService.getCollectionName(
      req.app.get('db'),
      collectionId,
    );

    let nameOfCollection;
    collectionName().then((name) => (name ? (nameOfCollection = name.collection_name) : null));

    collectionService
      .getPackagesByCollection(req.app.get('db'), collectionId, offset)
      .then((collection) => {
        const names = collection.map((set) => set.name); // separtely saving names and id's to manually add to the object
        const ids = collection.map((set) => set.id); // that is being returned to us via our npms query.

        collectionService.npmsAPI(names).then((data) => {
          if (data.length === 0) {
            return res.json({ name: nameOfCollection, packs: [] });
          }
          for (const i in data) {
            data[i].id = ids[i];
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
      return res.status(400).send({ error: 'missing content in request body' });
    }

    if (name.length === 0) {
      return res.status(400).send({ error: 'required field empty' });
    }

    collectionService
      .updateCollection(req.app.get('db'), collectionId, name)
      .then((collection) => res.status(200).json(collection))
      .catch(next);
  })
  .delete((req, res, next) => {
    const { collectionId } = req.params;

    if (!Number(collectionId)) {
      return res.status(400).send({ error: 'invalid parameter' });
    }

    collectionService
      .deleteCollection(req.app.get('db'), collectionId)
      .then((result) => res.status(204).end())
      .catch(next);
  });

module.exports = collectionRouter;
