import { Request, Response } from 'express';
import CreateSessionService from '../services/CreateSessionService';

class SessionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;
    const service = new CreateSessionService();
    const user = await service.execute({ email, password });

    return res.json(user);
  }
}

export default SessionsController;
