// db/models/SpamReport.js
const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const SpamReport = sequelize.define('SpamReport', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  reportCount: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  timestamps: true
});

module.exports = SpamReport;
