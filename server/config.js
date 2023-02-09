// require dotenv (npm i dotenv) so we can use .env file
require('dotenv').config()

const config = {
    db: {
      host: "localhost",
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
    },
  };
  module.exports = config;