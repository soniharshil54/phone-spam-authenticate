const ContactService = require('../services/contact');

module.exports = {
  async searchContactsByName(req, res) {
    const contacts = await ContactService.searchContactsByName(req.query.name);
    res.ok(contacts);
  },

  async searchContactsByNumber(req, res) {
    const contacts = await ContactService.searchContactsByNumber(req.query.phoneNumber);
    res.ok(contacts);
  },

  async getContact(req, res) {
    const contact = await ContactService.getContact(req.query.contactId, req.user.id);
    res.ok(contact);
  }
}