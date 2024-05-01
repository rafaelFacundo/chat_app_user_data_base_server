import { Model, DataTypes } from "sequelize";

// this is the user model
// basically it is saying what is the shape of an User entity

class User extends Model {
  static init(connection) {
    super.init(
      {
        username: DataTypes.STRING,
        password: DataTypes.STRING,
        is_active: DataTypes.BOOLEAN,
      },
      {
        sequelize: connection,
      }
    );
  }
}

export default User;
