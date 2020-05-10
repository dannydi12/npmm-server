const AuthService = require('../auth/auth-service');

const helperService = {
  handleToken(authHeader) {
    const authToken = authHeader;
    let bearerToken = authToken.slice(7, authToken.length);
    const payload = AuthService.verifyJwt(bearerToken);
    return payload;
  },
};

module.exports = helperService;
