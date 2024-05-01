import databaseConfig from "../configs/databaseConfig.js";
import { Sequelize } from "sequelize";
import User from "./model/User.js";

// creating a data base connection with sequelize
// passing the databaseconfig as parameter
// it will return a object that represents the database connection
const DATA_BASE_CONNECTION = new Sequelize(databaseConfig);

// this method is basically connecting to the server
DATA_BASE_CONNECTION.authenticate().then(() => {
  console.log("CONNECTED TO THE DATA BASE");
});

// configuration of model to use it with the database connection
User.init(DATA_BASE_CONNECTION);

export default DATA_BASE_CONNECTION;
