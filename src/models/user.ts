import { Sequelize as SequelizeClass, DataTypes } from 'sequelize';
const sequelize = new SequelizeClass('postgres://spaghettios@localhost:5432/encrypted_events_ts');
const createUserTable = () => {
  sequelize.define('user', {
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // We require usernames to have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{3,}$/
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        // We require passwords to have length of at least 3, and
        // only use letters, numbers and underscores.
        is: /^\w{3,}$/
      }
    },
    private_key: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  });
};

export { createUserTable };
