import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found.');

    const tokenRepository = getCustomRepository(UserTokenRepository);
    const token = await tokenRepository.generate(user.id);

    console.log(token);
  }
}

export default ForgotPasswordService;