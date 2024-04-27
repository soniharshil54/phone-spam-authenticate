/**
 * 401 (Unauthorized) Response
 *
 * Similar to 403 Forbidden.
 * Specifically for use when authentication is possible but has failed or not yet been provided.
 * Error code response for missing or invalid authentication token.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'E_UNAUTHORIZED',
    message: message || 'Missing or invalid authentication token',
    data: data || {},
  };

  this.status(401);
  this.json(response);
};
