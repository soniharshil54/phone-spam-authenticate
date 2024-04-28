const User = require('../db/models/User');

module.exports = {
  async createUser(user) {
    console.log('Creating user:', user);
    const newUserRecord = await User.create(user);
    console.log('User created:', newUserRecord);
    return newUserRecord;
  },
}