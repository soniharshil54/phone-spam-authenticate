const { Op, sequelize } = require('sequelize');

const { Contact } = require('../db/models');
const { User } = require('../db/models');
const { SpamReport } = require('../db/models');

module.exports = {
  async searchContactsByName(name) {
    const contacts = await Contact.findAll({
      where: {
        name: {
          [Op.or]: [
            { [Op.like]: `${name}%` },  // Names starting with 'name'
            { [Op.like]: `%${name}%` }  // Names containing 'name'
          ]
        }
      },
      order: [
        // Use CASE to order results: names starting with 'name' come first
        [sequelize.literal(`CASE WHEN name LIKE '${name}%' THEN 1 ELSE 2 END`), 'ASC'],
        ['name', 'ASC']  // Then order alphabetically by name
      ]
    });

    return contacts;
  },

  async searchContactsByNumber(phoneNumber) {
    const user = await User.findOne({
      where: { phoneNumber }
    });

    if (user) {
      return [user];
    } else {
      const contacts = await Contact.findAll({
        where: { phoneNumber }
      });
      return contacts;
    }
  },

  async getContact(contactId, requesterUserId) {
    // Retrieve the contact by ID
    const contact = await Contact.findByPk(contactId);
    if (!contact) {
      return { message: "Contact not found." };
    }

    // Retrieve spam report for the contact's phone number
    const spamReport = await SpamReport.findOne({
      where: { phoneNumber: contact.phoneNumber }
    });

    // Attempt to find a user by the contact's phone number
    const user = await User.findOne({
      where: { phoneNumber: contact.phoneNumber }
    });

    // Build the result with basic contact details and spam likelihood
    const result = {
      name: contact.name,
      phoneNumber: contact.phoneNumber,
      spamLikelihood: spamReport ? spamReport.reportCount : 0
    };

    // Check if the contact is a registered user and if requester is in their contacts
    if (user) {
      // Fetch all contacts of this user to see if requester is one of them
      const userContacts = await Contact.findAll({
        where: { ownerId: user.id }
      });

      // Find if requester's user ID is among the user's contacts
      const requesterIsContact = userContacts.some(c => c.id === requesterUserId);

      // Include email if requester is a contact of the user
      if (requesterIsContact) {
        result.email = user.email;
      }
    }

    return result;
  }
}