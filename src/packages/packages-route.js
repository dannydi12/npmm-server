const express = require('express');
const packagesService = require('./packages-service');

const packagesRouter = express.Router();
const jsonBodyParser = express.json();

packagesRouter.route('/').get((req, res, next) => {
  packagesService
    .getAllPackages(req.app.get('db'))
    .then((all_packages) => {
      res.status(200).json(all_packages);
    })
    .catch(next);
});

// packagesRouter.route('/collection').get((req, res, next) => {
//   let collectionId = req.query.collectionId;

//   packagesService
//     .collectionSpecificPackages(req.app.get('db'), collectionId)
//     .then();
// });

module.exports = packagesRouter;
