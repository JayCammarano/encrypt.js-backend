import { Sequelize } from 'sequelize';

const connectDB = () => {
  try {
    return new Sequelize(`postgres://spaghettios@localhost:5432/encrypted_events_ts`);
  } catch (error) {
    console.log(error);
    return `Error: ${error}`;
  }
};

const testDB = async (db: Sequelize) => {
  try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
    return true;
  } catch (err) {
    console.error('Unable to connect to the database:', err);
    return false;
  }
};

export { connectDB, testDB };
