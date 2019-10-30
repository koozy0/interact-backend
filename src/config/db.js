const { MONGO_URI } = process.env;

const db = {
  mongoURI: MONGO_URI,
};

module.exports = db;
