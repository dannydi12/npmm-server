const userService = {
  registerUser(db, email, password) {
    return db('users')
      .insert([{ email: `${email}`, password: `${password}` }])
      .returning('id');
  },
};

module.exports = userService;
