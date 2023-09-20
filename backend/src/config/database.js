/**
 * This auto-generated file is required to run sequelize migration.
 * TODO: look into merging this file with ./sequelize.ts
 */

require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
  },
};
