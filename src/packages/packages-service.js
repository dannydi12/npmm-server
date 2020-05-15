const packagesService = {
  addPackage(db, collection, name) {
    return db('packages')
      .insert({ collection, name })
      .returning('*')
      .then((row) => row[0]);
  },
  deletePackage(db, id) {
    return db('packages').where({ id }).del();
  },
  checkIfPackageExists(db, collection, name) {
    return db('packages').where({ collection, name }).returning('*');
  },
};

module.exports = packagesService;
