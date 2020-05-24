const xss = require('xss');
const fetch = require('node-fetch');

const collectionsService = {
  getAllCollections(db, id) {
    return db('collections').where({ user_id: id }).orderBy('id', 'asc');
  },

  checkIfCollectionExists(db, id, name) {
    return db('collections')
      .where({ user_id: id, collection_name: name })
      .returning('*');
  },

  getPackagesByCollection(db, collectionId, offset = 0) {
    return db('packages')
      .where({ collection: collectionId })
      .orderBy('id', 'desc')
      .limit(25)
      .offset(offset);
  },

  getAllPackages(db, collectionId) {
    return db('packages')
      .where({ collection: collectionId })
      .orderBy('id', 'desc');
  },

  cleanCollection(collection) {
    return collection.map(this.serializeCollection);
  },
  getCollectionName(db, collectionId) {
    return db('collections')
      .where({ id: collectionId })
      .returning('name')
      .then((row) => row[0]);
  },

  updateCollection(db, id, name) {
    return db('collections')
      .where({ id })
      .update({
        collection_name: name,
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
              package: {
                name,
                description: resJSON[name].collected.metadata.description,
                links: resJSON[name].collected.metadata.links,
                version: resJSON[name].collected.metadata.version,
              },
              score: resJSON[name].score,
            };
          }
        });
        return packages;
      });
  },

  addCollection(db, name, user_id) {
    return db('collections')
      .insert({
        collection_name: name,
        user_id,
      })
      .returning('*')
      .then((row) => row[0]);
  },

  serializeCollection(collection) {
    return {
      id: collection.id,
      collection_name: xss(collection.collection_name),
    };
  },
};

module.exports = collectionsService;
