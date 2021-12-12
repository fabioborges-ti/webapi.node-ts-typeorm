import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPasswordService';

class ResetPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { password, token } = req.body;
    const service = new ResetPasswordService();
    await service.execute({ password, token });
    return res.json({ message: 'reset successful process.' });
  }
}

export default ResetPasswordController;
