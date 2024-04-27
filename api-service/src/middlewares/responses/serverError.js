/**
 * 500 (Internal Server Error) Response
 *
 * A generic error message, given when no more specific message is suitable.
 * The general catch-all error when the server-side throws an exception.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'E_INTERNAL_SERVER_ERROR',
    message: message || 'Something bad happened on the server',
    data: data || {},
  };

  this.status(500);
  this.json(response);
};
