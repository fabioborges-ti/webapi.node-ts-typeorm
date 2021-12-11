import { Request, Response } from 'express';
import ForgotPasswordService from '../services/ForgotPasswordService';

class ForgotPasswordController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { email } = req.body;
    const service = new ForgotPasswordService();
    await service.execute({ email });
    return res.status(200).json({ message: 'Sent email to reset password' });
  }
}

export default ForgotPasswordController;
