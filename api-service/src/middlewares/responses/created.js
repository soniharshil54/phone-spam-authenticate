/**
 * 201 (Created) Response
 *
 * The request has been fulfilled and resulted in a new resource being created.
 * Successful creation occurred (via either POST or PUT).
 * Set the Location header to contain a link to the newly-created resource (on POST).
 * Response body content may or may not be present.
 */

module.exports = function (data, message, apiAction) {
  const response = {
    apiAction: apiAction || 'CREATED',
    message: message || 'The request has been fulfilled and resulted in a new resource being created',
    data: data || {},
  };

  this.status(201);
  this.json(response);
};
