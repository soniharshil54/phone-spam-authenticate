/**
 * 200 (OK) Response
 *
 * General status code. Most common code used to indicate success.
 * The actual response will depend on the request method used.
 * In a GET request, the response will contain an entity corresponding to the requested resource.
 * In a POST request the response will contain an entity describing or containing the result.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    code: apiAction || 'OK',
    message: message || 'Operation is successfully executed',
    data: data || {},
  };

  this.status(200);
  this.json(response);
};
