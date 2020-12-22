import { Sequelize } from 'sequelize';
import { connectDB, testDB } from '../../db/dbconfig';

it('connects to the db', async () => {
  const connected = connectDB();
  expect(await connected).toBeInstanceOf(Sequelize);
});
it('tests the connection to the db when successfully connected', async () => {
  const db = new Sequelize(`postgres://spaghettios@localhost:5432/encrypted_events_ts`);
  expect(await testDB(db)).toBe(true);
  db.close();
});
it('tests the connection to the db when unsuccessfully connected', async () => {
  const db = new Sequelize('postgres://testdb@localhost:2/encrypted_events_ts');
  expect(await testDB(db)).toBe(false);
  db.close();
});
