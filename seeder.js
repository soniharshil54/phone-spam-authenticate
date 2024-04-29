const { User } = require('../models');
const { Contact } = require('../models');
const { SpamReport } = require('../models');
const { faker } = require('@faker-js/faker');
const AuthService = require('../../services/auth');

async function seedUsers(count = 100) {
  for (let i = 0; i < count; i++) {
    await AuthService.createUser({
      name: faker.person.fullName(),
      phoneNumber: faker.phone.number(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    });
  }
}

async function seedContacts(count = 300) {
  const users = await User.findAll();
  users.forEach(async (user) => {
    for (let i = 0; i < count / users.length; i++) {
      await Contact.create({
        ownerId: user.id,
        name: faker.person.fullName(),
        phoneNumber: faker.phone.number(),
      });
    }
  });
}

async function seedSpamReports(count = 50) {
  for (let i = 0; i < count; i++) {
    await SpamReport.create({
      phoneNumber: faker.phone.phoneNumber(),
      reportCount: faker.number.int({ min: 0, max: 100 }),
    });
  }
}

async function seedAll() {
  console.log('Database synced!');
  await seedUsers();
  console.log('Users seeded!');
  await seedContacts();
  console.log('Contacts seeded!');
  await seedSpamReports();
  console.log('Spam Reports seeded!');
}

seedAll()
  .then(() => console.log('Seeding complete!'))
  .catch(console.error);

module.exports = {
  seedAll,
}; 