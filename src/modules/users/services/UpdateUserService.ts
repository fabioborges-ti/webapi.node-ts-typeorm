import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findOne(id);

    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await repository.findByEmail(email);

    if (emailExists && email !== user.email) {
      throw new AppError('There is already one user with this email');
    }

    user.name = name;
    user.email = email;
    user.password = password;

    await repository.save(user);
    return user;
  }
}

export default UpdateUserService;
