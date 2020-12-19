import { Sequelize } from 'sequelize';
import { connectDB, testDB } from '../../db/dbconfig';

it('connects to the db', () => {
  const connected = connectDB();
  expect(connected).toBeInstanceOf(Sequelize);
});

it('tests the connection to the db when successfully connected', async () => {
  const db = new Sequelize('postgres://spaghettios@localhost:5432/encrypted_events_ts');
  expect(await testDB(db)).toBe(true);
  db.close();
});
