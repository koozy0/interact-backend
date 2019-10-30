const { JWT_SECRET } = process.env;

const authentication = {
  jwtSecret: JWT_SECRET,
};

module.exports = authentication;
