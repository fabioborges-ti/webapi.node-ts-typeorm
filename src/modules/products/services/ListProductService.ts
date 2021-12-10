import { getCustomRepository } from 'typeorm';
import Product from '../typeorm/entities/Product';
import ProductRepository from '../typeorm/repositories/ProductRepository';

class ListProductService {
  public async execute(): Promise<Product[]> {
    const repository = getCustomRepository(ProductRepository);
    const products = await repository.find();
    return products;
  }
}

export default ListProductService;
