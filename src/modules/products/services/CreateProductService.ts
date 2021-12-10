import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const repository = getCustomRepository(ProductRepository);
    const productExists = await repository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name');
    }

    const product = repository.create({ name, price, quantity });
    await repository.save(product);
    return product;
  }
}

export default CreateProductService;
