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
};

module.exports = packagesService;
