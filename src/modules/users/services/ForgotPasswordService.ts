import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class ForgotPasswordService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) throw new AppError('User not found.');

    const tokenRepository = getCustomRepository(UserTokenRepository);
    const userToken = await tokenRepository.generate(user.id);

    const template = path.resolve(
      __dirname,
      '..',
      'views',
      'forgotPassword.hbs',
    );

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] - recuperação de senha',
      templateData: {
        file: template,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${userToken.token}`,
        },
      },
    });
  }
}

export default ForgotPasswordService;
