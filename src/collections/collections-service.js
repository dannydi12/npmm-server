const collectionsService = {
  getAllCollections(db, id) {
    return db('collections').where({ user_id: `${id}` });
  },
};

module.exports = collectionsService;
