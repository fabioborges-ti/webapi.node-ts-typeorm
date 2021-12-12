import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

class OrdersController {
  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const service = new ShowOrderService();
    const order = await service.execute({ id });
    return res.json(order);
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, products } = req.body;
    const service = new CreateOrderService();
    const order = await service.execute({ customer_id, products });
    return res.json(order);
  }
}

export default OrdersController;
