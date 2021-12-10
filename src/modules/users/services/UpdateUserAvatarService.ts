import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  user_id: string;
  filename?: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, filename }: IRequest): Promise<User> {
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    if (user.avatar) {
      const avatarFile = path.join(uploadConfig.directory, user.avatar);
      const fileExists = await fs.promises.stat(avatarFile);

      if (fileExists) {
        await fs.promises.unlink(avatarFile);
      }
    }

    if (filename) {
      user.avatar = filename;
      await repository.save(user);
    }

    return user;
  }
}

export default UpdateUserAvatarService;
