const { responseHandler } = require('../middlewares/responseHandler');

module.exports = function routes(app) {
    app.use('/api/v1/healthcheck', responseHandler, require('./healthcheck'));
};