import User from '../db/user.model';

const createUser = async (username: string, password: string) => {
  const private_key = 'This Will Be Encryted and Generated';
  const user = await User.create({
    username: username,
    password: password,
    private_key: private_key
  });
  return { user: { username: user.username, password: user.password, private_key: user.private_key } };
};

const findUser = async (username: string): Promise<User> => {
  try {
    const selectedUser = await User.findAll({
      where: {
        username: username
      }
    });
    return selectedUser[0];
  } catch (error) {
    console.log('Error ', error);
    return error;
  }
};
export { createUser, findUser };
