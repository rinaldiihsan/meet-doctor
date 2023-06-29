const response = (statusCode, data, message, res) => {
  res.send(statusCode, [
    {
      payload: data,
      message,
    },
  ]);
};

module.exports = response;
 