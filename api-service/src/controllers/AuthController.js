const AuthService = require('../services/auth');

module.exports = {
  async signUp(req, res) {
    const params = { ...req.body };
    const user = await AuthService.createUser(params);
    return res.ok(user);
  },

  async logIn(req, res) {
    const params = { ...req.body };
    const loginData = await AuthService.loginUser(params);
    return res.ok(loginData);
  }
}