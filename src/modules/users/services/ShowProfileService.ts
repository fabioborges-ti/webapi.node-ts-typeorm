import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
}

class ShowProfileService {
  public async execute({ user_id }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findById(user_id);
    if (!user) throw new AppError('User not found');
    return user;
  }
}

export default ShowProfileService;
