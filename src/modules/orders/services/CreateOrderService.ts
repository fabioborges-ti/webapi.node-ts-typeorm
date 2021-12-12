import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from '../typeorm/entities/Order';
import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import ProductRepository from '@modules/products/typeorm/repositories/ProductRepository';
import OrdersRepository from '../typeorm/repositories/OrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerRepository = getCustomRepository(CustomerRepository);
    const customerExists = await customerRepository.findById(customer_id);
    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id.');
    }

    const productRepository = getCustomRepository(ProductRepository);

    const existsProducts = await productRepository.findByIds(products);
    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given id.');
    }

    const existsProductsIds = existsProducts.map(product => product.id);
    const checkNonExistent = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkNonExistent.length) {
      throw new AppError(`Could not find product ${checkNonExistent[0].id}`);
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id} `,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const orderRepository = getCustomRepository(OrdersRepository);
    const order = await orderRepository.CreateOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedproductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.id)[0].quantity -
        product.quantity,
    }));

    await productRepository.save(updatedproductQuantity);
    return order;
  }
}

export default CreateOrderService;
