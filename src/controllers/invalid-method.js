const invalidMethod = (req, res) => {
  const message = 'Invalid method';
  const status = 405;
  res.status(status).json({ message, status });
};

module.exports = invalidMethod;
