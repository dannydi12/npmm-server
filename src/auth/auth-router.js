const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

//do not attempt this endpoint with demo user because password isnt saved as hash.

authRouter.post('/login', jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body;
  const loginuser = { email, password };

  for (const [key, value] of Object.entries(loginuser))
    if (value == null)
      return res.status(400).json({
        error: `Missing ${key} in request body`,
      });

  AuthService.getUserWithUserName(req.app.get('db'), loginuser.email)
    .then((dbUser) => {
      if (!dbUser) {
        return res
          .status(400)
          .json({ error: 'Inccorect user_name or password' });
      }
      return AuthService.comparePasswords(
        loginuser.password,
        dbUser.password
      ).then((compareMatch) => {
        if (!compareMatch) {
          return res
            .status(400)
            .json({ error: 'Incorrect user_name or password' });
        }
        const sub = dbUser.email;
        const payload = { userId: dbUser.id };
        res.send({ authToken: AuthService.createJwt(sub, payload) });
      });
    })
    .catch(next);
});

module.exports = authRouter;
