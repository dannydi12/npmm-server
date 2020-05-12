const xss = require('xss');
const fetch = require('node-fetch');

const collectionsService = {
  getAllCollections(db, id, type = null) {
    if (type === 'launchpad') {
      return db('collections').where({ user_id: id, is_launchpad: true });
    } else if (type === 'collection') {
      return db('collections').where({ user_id: id, is_launchpad: false });
    } else {
      return db('collections').where({ user_id: id });
    }
  },

  getPackagesByCollection(db, collectionId) {
    return db('packages').where({ collection: collectionId });
  },

  cleanCollection(collection) {
    return collection.map(this.serializeCollection);
  },

  updateCollection(db, id, name, isLaunchPad) {
    return db('collections')
      .where({ id })
      .update({
        collection_name: name,
        is_launchpad: isLaunchPad,
      })
      .returning('*')
      .then((row) => row[0]);
  },

  deleteCollection(db, id) {
    return db('collections').where({ id }).del();
  },

  npmsAPI(nameArray) {
    return fetch('https://api.npms.io/v2/package/mget', {
      headers: {
        'content-type': 'application/json',
      },
      method: 'post',
      body: JSON.stringify(nameArray),
    })
      .then((result) => result.json())
      .then((resJSON) => {
        const packages = nameArray.map((name) => {
          if (resJSON[name]) {
            return {
              name,
              score: resJSON[name].score,
              description: resJSON[name].collected.metadata.description,
              links: resJSON[name].collected.metadata.links,
            };
          }
        });
        return packages;
      });
  },

  addCollection(db, name, user_id, is_launchpad = 'false') {
    return db('collections')
      .insert({
        collection_name: name,
        user_id: user_id,
        is_launchpad: is_launchpad,
      })
      .returning('*')
      .then((row) => row[0]);
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
