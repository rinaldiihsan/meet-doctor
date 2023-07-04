const response = (statusCode, fields, res) => {
  res.send(statusCode, fields);
};

module.exports = response;
