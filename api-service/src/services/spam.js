const SpamReport = require('../db/models/SpamReport');

module.exports = {
  async markAsSpam(phoneNumber) {
    const spamReport = await SpamReport.findOne({
      where: {
        phoneNumber
      }
    });

    if (spamReport) {
      spamReport.reportCount += 1;
      await spamReport.save();
    } else {
      await SpamReport.create({
        phoneNumber
      });
    }
  },
}