const packagesService = {
  addPackage(db, collection, name) {
    return db('packages')
      .insert({ collection, name })
      .returning('*')
      .then((row) => row[0]);
  },
};

module.exports = packagesService;
