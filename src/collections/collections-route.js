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
    return collectionService
      .getAllCollections(req.app.get('db'), req.payload.sub)
      .then((allCollections) => res
        .status(200)
        .json(collectionService.cleanCollection(allCollections)))
      .catch(next);
  })

  .post(jsonBodyParser, (req, res, next) => {
    const { name } = req.body;
    const userId = req.payload.sub;

    if (!name) {
      return res.status(400).json({ error: 'missing required content' });
    }
    if (name.trim().length === 0) {
      return res.status(400).json({ error: 'empty string in request body' });
    }

    return collectionService
      .checkIfCollectionExists(req.app.get('db'), userId, name)
      .then((check) => {
        if (check.length > 0) {
          return res.status(400).end();
        }
        return collectionService
          .addCollection(req.app.get('db'), name, userId)
          .then((collection) => res.status(201).json(collection))
          .catch(next);
      });
  });

collectionRouter
  .route('/:collectionId')
  .all(requireAuth)
  .get(async (req, res, next) => {
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

    const nameOfCollection = await collectionService.getCollectionName(
      req.app.get('db'),
      collectionId,
    ).then((name) => (name ? name.collection_name : null)).catch(next);

    if (!nameOfCollection) {
      return res.status(404).send({ error: 'collection does\'t exist' });
    }

    const collectionPacks = await collectionService.getPackagesByCollection(req.app.get('db'), collectionId, offset).catch(next);

    if (!collectionPacks) {
      return res.json({ name: nameOfCollection, packs: [] }).catch(next);
    }

    const names = collectionPacks.map((pack) => pack.name);
    const npmsData = await collectionService.npmsAPI(names).catch(next);

    // If npms doesn't return anything, send an empty array back
    if (!npmsData[0]) {
      return res.json({
        name: nameOfCollection,
        packs: [],
      });
    }

    // adding package IDs from our local database
    Object.entries(npmsData).forEach((_, i) => {
      npmsData[i].id = collectionPacks[i].id;
    });

    return res.json({
      name: nameOfCollection,
      packs: npmsData.filter((element) => element != null),
    });
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
