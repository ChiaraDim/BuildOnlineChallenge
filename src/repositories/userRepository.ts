import { User } from '../models/user';

class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const user = await User.findOne({ where: { email } });
    return user;
  }

  async createUser(email: string, password: string): Promise<User> {
    const newUser = await User.create({ email, password });
    return newUser;
  }
}

export default new UserRepository();
