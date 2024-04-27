/**
 * 404 (Not Found) Response
 *
 * The requested resource could not be found but may be available again in the future.
 * Subsequent requests by the client are permissible.
 * Used when the requested resource is not found, whether it doesn't exist.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'E_NOT_FOUND',
    message: message || `The requested resource could not be found
    but may be available again in the future`,
    data: data || {},
  };

  this.status(404);
  this.json(response);
};
