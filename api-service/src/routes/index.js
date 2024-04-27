module.exports = function routes(app) {
    app.use('/api/v1/healthcheck', require('./healthcheck'));
};