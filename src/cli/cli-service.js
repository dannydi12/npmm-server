const cliService = {
  userCollectionsFromEmail(db, email) {
    return db('users').where({ email }).returning('id');
  },
};

module.exports = cliService;
