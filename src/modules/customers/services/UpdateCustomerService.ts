import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const repository = getCustomRepository(CustomerRepository);
    const customer = await repository.findOne(id);
    if (!customer) throw new AppError('Customer not found');

    const emailExists = await repository.findByEmail(email);
    if (emailExists && email !== customer.email) {
      throw new AppError('There is already one customer  with this email');
    }

    customer.name = name;
    customer.email = email;

    await repository.save(customer);
    return customer;
  }
}

export default UpdateCustomerService;
