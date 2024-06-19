import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "./src/database/index.js";
import userRouter from "./src/routes/userRoutes.js";

//configure the app to use the .env file
dotenv.config();
// this is my app, basically this app const will contain all the express functions
// like to create the server, add routers, etc
// in other words it's my express app
const app = express();
const API_ENTRY_POINT = process.env.SERVER_BASE_URL;
console.log(API_ENTRY_POINT);
app.use(express.json());
app.use(cors());
app.use(API_ENTRY_POINT, userRouter);

app.listen(process.env.SERVER_PORT, () => {
  console.log("THE SERVER IS ON");
});
