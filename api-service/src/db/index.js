const { Sequelize } = require('sequelize');

const { DB_DATABASE, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => {
        console.log('Database connected.');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

module.exports = sequelize;
