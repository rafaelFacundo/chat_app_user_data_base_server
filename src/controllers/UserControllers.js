import User from "../database/model/User.js";
import DATA_BASE_CONNECTION from "../database/index.js";
import { encryptPassword, comparePasswords } from "../utils/security.js";

// controller to create a new user
export const createNewUser = async (req, res) => {
  // the username and the password received from the request
  // to create a new user
  const { NEW_USER_NAME, NEW_USER_PASSWORD } = req.body;
  // creating new transaction to create a new user
  // doing it to be more easy to give a rollback if some goes wrong
  const newUserTransaction = await DATA_BASE_CONNECTION.transaction();
  try {
    // encrypting password
    const encryptedPassword = await encryptPassword(NEW_USER_PASSWORD);
    // creating new user
    // if the new user try to create an account with a username that
    // already exists it will throw an error that will be catch
    // by the try catch
    const newUser = await User.create({
      username: NEW_USER_NAME,
      password: encryptedPassword,
    });
    // creating the return user
    const userToReturn = { id: newUser.id, username: newUser.username };
    // finishing the transaction
    newUserTransaction.commit();
    // returning the response to the request
    return res
      .status(200)
      .json({ message: "USER SUCESSFULLY CREATED", data: userToReturn });
  } catch (error) {
    // if there's an error
    // verifying if the is it because of the unique constrain applied in the username row
    // and if there is an error rollback the transaction of create a user
    await newUserTransaction.rollback();
    console.log(error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(403)
        .json({ message: "THIS USERNAME IS ALREADY IN THE DATABASE." });
    }
    return res.status(500).json({ message: "Something went wrong" });
  }
};

// controller to make user login
export const makeLogin = async (req, res) => {
  // username and password received from request
  const { USERNAME, PASSWORD } = req.body;
  try {
    //trying to find an user in the database with the same username
    const userWithTheSameUsername = User.findOne({
      where: {
        name: USERNAME,
      },
    });
    // verifying if there is an user with the user name
    // if not throw an error
    if (userWithTheSameUsername) {
      // if the usernames match, verifying the passwords
      const arePasswordsMatching = await comparePasswords(
        PASSWORD,
        userWithTheSameUsername.password
      );
      // if the passwords match return success authentication
      if (arePasswordsMatching) {
        return res.status(200).json({
          message: "USER SUCCESSFULLY AUTHENTICATED.",
          data: { user_id: userWithTheSameUsername.id },
        });
      }
      // if the passwords do not match throw an error
      const error = new Error();
      error.message = "WRONG PASSWORD.";
      error.code = 401;
      throw error;
    }
    // if did not find an user with the username provided
    // throw an error
    const error = new Error();
    error.message = "USER NOT FOUND.";
    error.code = 401;
    throw error;
  } catch (error) {
    console.log(error);
    // verifying if the error it's an error created in this function
    if (
      error.message === "WRONG PASSWORD." ||
      error.message === "USER NOT FOUND."
    ) {
      return res.status(error.code).json({ message: error.message });
    }
    // if not return a generic server error with the status 500
    return res
      .status(500)
      .json({ message: "SOMETING WENT WRONG PLEASE TRY AGAIN LATER." });
  }
};
