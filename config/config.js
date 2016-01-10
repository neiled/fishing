var dotenv = require('dotenv');
dotenv.load();
module.exports = {
    production: {
      use_env_variable: "DATABASE_URL",
      dialectOptions: { ssl: true }
    },
    test: {
      use_env_variable: "DATABASE_URL"
    },
    development: {
      use_env_variable: "DATABASE_URL",
      // dialectOptions: { ssl: true }
    }
};
