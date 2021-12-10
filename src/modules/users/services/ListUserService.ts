import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

class ListUserService {
  public async execute(): Promise<User[]> {
    const repository = getCustomRepository(UserRepository);
    const users = await repository.find();
    return users;
  }
}

export default ListUserService;
