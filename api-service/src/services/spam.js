const { SpamReport } = require('../db/models');

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

  async isSpam(phoneNumber) {
    const spamReport = await SpamReport.findOne({
      where: {
        phoneNumber
      }
    });
    if (!spamReport) {
      return {
        isSpam: false,
        reportCount: 0
      };
    }
    return {
      isSpam: spamReport.reportCount ? true : false,
      reportCount: spamReport.reportCount
    };
  },
}