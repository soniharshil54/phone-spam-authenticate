const SpamService = require('../services/spam');

module.exports = {
  async markAsSpam(req, res) {
    const params = { ...req.body };
    const spamResponse = await SpamService.markAsSpam(params.phoneNumber);
    return res.ok(spamResponse);
  },
}