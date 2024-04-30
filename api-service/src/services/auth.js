// services/auth.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User } = require('../db/models');
const { Contact } = require('../db/models');

module.exports = {
  async createUser(user) {
    const userData = {
      ...user,
      password: await this.encryptPassword(user.password)
    }
    const newUserRecord = await User.create(userData);
    const userDataWithoutPassword = {
      ...newUserRecord.get(),
      password: undefined // Or you can use null if you prefer
    };
    await Contact.create({
      ownerId: newUserRecord.id,
      name: newUserRecord.name,
      phoneNumber: newUserRecord.phoneNumber,
      isRegistered: true
    });
    return userDataWithoutPassword;
  },

  async loginUser(userCredential) {
    console.log('userCredential.phoneNumber', userCredential.phoneNumber);
    const userRecord = await User.findOne({ where: { phoneNumber: userCredential.phoneNumber } });
    if (!userRecord) {
      throw new Error('User not found');
    }
    const passwordMatch = await bcrypt.compare(userCredential.password, userRecord.password);
    if (!passwordMatch) {
      throw new Error('Invalid password');
    }
    const userDataWithoutPassword = {
      ...userRecord.get(),
      password: undefined // Or you can use null if you prefer
    };
    const token = this.signToken(userRecord);
    return {
      user: userDataWithoutPassword,
      token
    }
  },

  async encryptPassword(password) {
    const encryptedPassword = await bcrypt.hash(password, 10);
    return encryptedPassword
  },

  signToken(user) {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || "soni", { expiresIn: '1h' });
    return token;
  }
}