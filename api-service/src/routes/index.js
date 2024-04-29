const { responseHandler } = require('../middlewares/responseHandler');
const { protect } = require('../middlewares/checkAuth');

module.exports = function routes(app) {
    app.use('/api/v1/healthcheck', responseHandler, require('./healthcheck'));
    app.use('/api/v1/auth', responseHandler, require('./auth'));
    app.use('/api/v1/spam', responseHandler, protect, require('./spam'));
};