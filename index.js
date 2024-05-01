import express from "express";
import dotenv from "dotenv";
import "./src/database/index.js";
//configure the app to use the .env file
dotenv.config();
// this is my app, basically this app const will contain all the express functions
// like to create the server, add routers, etc
// in other words it's my express app
const app = express();

app.get("/", (req, res) => {
  res.send("HELLO ");
});

app.listen(process.env.SERVER_PORT, () => {
  console.log("THE SERVER IS ON");
});
