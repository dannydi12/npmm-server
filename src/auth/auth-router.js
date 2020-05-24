const express = require('express');
const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter.post('/login', jsonBodyParser, (req, res, next) => {
  const { email, password } = req.body;
  const loginuser = { email, password };

  if (
    !new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(email)
  ) {
    return res.status(400).json({ error: 'invalid email format' });
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(loginuser)) {
    if (value == null) {
      return res.status(400).json({
        error: `Missing ${key} in request body`,
      });
    }
  }

  loginuser.email = loginuser.email.toLowerCase();

  return AuthService.getUserWithUserName(req.app.get('db'), loginuser.email)
    .then((dbUser) => {
      if (!dbUser) {
        return res
          .status(400)
          .json({ error: 'Inccorect user_name or password' });
      }
      return AuthService.comparePasswords(
        loginuser.password,
        dbUser.password,
      ).then((compareMatch) => {
        if (!compareMatch) {
          return res
            .status(400)
            .json({ error: 'Incorrect user_name or password' });
        }

        const sub = `${dbUser.id}`;
        const payload = { email: dbUser.email };
        return res
          .status(200)
          .send({ authToken: AuthService.createJwt(sub, payload) });
      });
    })
    .catch(next);
});

module.exports = authRouter;
