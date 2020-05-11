const xss = require('xss');

const collectionsService = {
  getAllCollections(db, id) {
    return db('collections').where({ user_id: `${id}` });
  },

  cleanCollection(collection) {
    return collection.map(this.serializeCollection);
  },

  updateCollection(db, id, name, isLaunchPad) {
    return db('collections').where({ id }).update({
      collection_name: name,
      is_launchpad: isLaunchPad,
    });
  },

  deleteCollection(db, id) {
    return db('collections').where({ id }).del();
  },

  addCollection(db, name, user_id, is_launchpad = 'false') {
    return db('collections').insert({
      collection_name: name,
      user_id: user_id,
      is_launchpad: is_launchpad,
    });
  },

  serializeCollection(collection) {
    return {
      id: collection.id,
      collection_name: xss(collection.collection_name),
      is_launchpad: collection.is_launchpad,
    };
  },
};

module.exports = collectionsService;
