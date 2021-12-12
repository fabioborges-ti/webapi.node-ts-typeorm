import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

class ListUserService {
  public async execute(): Promise<Customer[]> {
    const repository = getCustomRepository(CustomerRepository);
    const customers = await repository.find();
    return customers;
  }
}

export default ListUserService;
