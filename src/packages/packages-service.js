const packagesService = {
  getAllPackages(db) {
    return db('packages');
  },
  collectionSpecificPackages(db, collectionId) {
    return db('packages').where({ collection: `${collectionId}` });
  },
};

module.exports = packagesService;
