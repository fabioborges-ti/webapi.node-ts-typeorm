import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    const customer = await repository.findById(id);
    if (!customer) throw new AppError('Customer not found.');
    return customer;
  }
}

export default ShowCustomerService;
