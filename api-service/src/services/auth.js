const bcrypt = require('bcryptjs');

const User = require('../db/models/User');

module.exports = {
  async createUser(user) {
    const userData = {
      ...user,
      password: await this.encryptPassword(user.password)
    }
    const newUserRecord = await User.create(userData);
    return newUserRecord;
  },

  async encryptPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword
  }
}