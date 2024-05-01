import dotenv from "dotenv"; // needed to import dotned here because it cant access env var from here
dotenv.config();
export default {
  dialect: "postgres",
  host: process.env.DATA_BASE_HOST,
  username: process.env.DATA_BASE_USERNAME,
  password: process.env.DATA_BASE_PASSWORD,
  database: process.env.DATA_BASE,
  define: {
    underscored: true,
  },
};
