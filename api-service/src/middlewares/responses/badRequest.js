/**
 * 400 (Bad Request) Response
 *
 * The request cannot be fulfilled due to bad syntax.
 * General error when fulfilling the request would cause an invalid state.
 * Domain validation errors, missing data, etc.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'E_BAD_REQUEST',
    message: message || 'The request cannot be fulfilled due to bad syntax',
    data: data || {},
  };

  this.status(400);
  this.json(response);
};
