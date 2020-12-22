import User from '../db/user.model';
import { keyGen } from '../encryption/secretBox';

const createUser = async (username: string, password: string) => {
  const private_key = keyGen();
  const user = await User.create({
    username: username,
    password: password,
    private_key: private_key
  });
  return { user: { username: user.username, password: user.password, private_key: user.private_key } };
};

const findUser = async (username: string): Promise<Object> => {
  const selectedUser = await User.findAll({
    where: {
      username: username
    }
  });
  if (typeof selectedUser !== undefined) {
    const user1 = selectedUser[0];
    return { user: { username: user1.username, password: user1.password, private_key: user1.private_key } };
  } else {
    console.log('Error: User not found');
    return 'Error: User not found';
  }
};
export { createUser, findUser };
