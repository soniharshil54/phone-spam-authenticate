const badRequest = require('./responses/badRequest');
const created = require('./responses/created');
const ok = require('./responses/ok');
const notFound = require('./responses/notFound');
const serverError = require('./responses/serverError');
const unauthorized = require('./responses/unauthorized');

const responseHandler = async (req, res, next) => {
  res.badRequest = badRequest,
    res.created = created,
    res.ok = ok,
    res.notFound = notFound,
    res.serverError = serverError,
    res.unauthorized = unauthorized,
    next();
};

module.exports = { responseHandler };
