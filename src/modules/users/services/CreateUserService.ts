import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const emailExists = await repository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email address already used.');
    }

    const user = repository.create({ name, email, password });
    await repository.save(user);
    return user;
  }
}

export default CreateUserService;
