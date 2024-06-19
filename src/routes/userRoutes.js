import express from "express";
import { createNewUser, makeLogin } from "../controllers/UserControllers.js";
//creating a new router to handle the user routes
const userRouter = express.Router();

//creating the routes
// post route to create a new user
userRouter.post("/user/signup", createNewUser);
userRouter.post("/user/login", makeLogin);

export default userRouter;
