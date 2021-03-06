import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

class UsersAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const service = new UpdateUserAvatarService();
    const user = await service.execute({
      user_id: req.user.id,
      filename: req.file?.filename,
    });
    return res.json(user);
  }
}

export default UsersAvatarController;
