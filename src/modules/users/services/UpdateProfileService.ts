import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findById(user_id);
    if (!user) {
      throw new AppError('User not found');
    }

    const emailExists = await repository.findByEmail(email);
    if (emailExists && user.id !== emailExists.email) {
      throw new AppError('There is already one user with this email');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) throw new AppError('Password does not match.');
      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;

    await repository.save(user);
    return user;
  }
}

export default UpdateProfileService;
