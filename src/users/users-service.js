const userService = {
  registerUser(db, email, password) {
    return db('users')
      .insert([{ email: `${email}`, password: `${password}` }])
      .returning('id')
      .then((row) => row[0]);
  },
};

module.exports = userService;
