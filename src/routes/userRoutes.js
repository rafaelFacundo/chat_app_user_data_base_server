import express from "express";
import { createNewUser, makeLogin } from "../controllers/UserControllers.js";
//creating a new router to handle the user routes
const USER_ROUTER = express.Router();

//creating the routes
// post route to create a new user
USER_ROUTER.post("/user/signup", createNewUser);
USER_ROUTER.post("/user/login", makeLogin);

export default USER_ROUTER;
