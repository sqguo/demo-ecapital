import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;
const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;

const sequelize = new Sequelize(dbName!, dbUsername!, dbPassword!, {
  host: dbHost,
  dialect: "postgres",
});

sequelize.sync();

export default sequelize;
