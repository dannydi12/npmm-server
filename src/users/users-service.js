const userService = {
  registerUser(db, email, password) {
    return db('users')
      .where({ email: email })
      .then((users) => {
        if (users.length === 0) {
          return db('users')
            .insert([{ email: `${email}`, password: `${password}` }])
            .returning('id')
            .then((row) => row[0]);
        } else {
          return false;
        }
      });
  },
};

module.exports = userService;
