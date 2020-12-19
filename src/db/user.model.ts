import { Sequelize, Model, ModelDefined, DataTypes, Optional } from 'sequelize';
import { connectDB } from './dbconfig';
// These are all the attributes in the User model
const sequelize = new Sequelize(`postgres://spaghettios@localhost:5432/encrypted_events_ts`);
interface UserAttributes {
  user_id: number;
  username: string;
  password: string;
  private_key: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id'> {}
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public username!: string;
  public password!: string;
  public private_key!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // add associations here when the time comes
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: false
    },
    password: {
      type: new DataTypes.STRING(128),
      allowNull: true
    },
    private_key: {
      type: new DataTypes.STRING(128),
      unique: true,
      allowNull: true
    }
  },
  {
    tableName: 'users',
    sequelize // passing the `sequelize` instance is required
  }
);
export default User;
