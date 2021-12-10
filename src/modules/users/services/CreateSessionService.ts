import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

// interface IResponse {
//   user: User;
// }

class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findByEmail(email);

    if (!user) {
      throw new AppError('access denied.', 401);
    }

    const isConfirmed = await compare(password, user.password);

    if (!isConfirmed) {
      throw new AppError('access denied.', 401);
    }

    return user;
  }
}

export default CreateSessionService;
