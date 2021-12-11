import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
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

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] - recuperação de senha',
      templateData: {
        template: `Olá, {{name}}. Segue solicitação de redefinição de senha: {{token}}`,
        variables: {
          name: user.name,
          token: userToken.token,
        },
      },
    });
  }
}

export default ForgotPasswordService;
