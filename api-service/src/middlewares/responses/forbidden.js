/**
 * 403 (Forbidden) Response
 *
 * The request was a legal request, but the server is refusing to respond to it.
 * Unlike a 401 Unauthorized response, authenticating will make no difference.
 * Error code for user not authorized to perform the operation or the resource is unavailable.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'E_FORBIDDEN',
    message: message || 'User not authorized to perform the operation',
    data: data || {},
  };

  this.status(403);
  this.json(response);
};
