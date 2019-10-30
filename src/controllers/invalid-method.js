const invalidMethod = (req, res) =>
  res.status(405).json({ msg: 'Invalid method' });

module.exports = invalidMethod;
