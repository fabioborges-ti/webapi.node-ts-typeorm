import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  id: string;
}

class DeleteUserService {
  public async execute({ id }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findById(id);

    if (!user) {
      throw new AppError('User not found.');
    }

    await repository.remove(user);
    return user;
  }
}

export default DeleteUserService;
