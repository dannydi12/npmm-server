const xss = require('xss');

const collectionsService = {
  getAllCollections(db, id) {
    return db('collections').returning('*');
  },

  cleanCollection(collection) {
    return collection.map(this.serializeCollection);
  },

  serializeCollection(collection) {
    return {
      id: collection.id,
      user_id: collection.user_id,
      collection_name: xss(collection.collection_name),
    };
  },
};

module.exports = collectionsService;
