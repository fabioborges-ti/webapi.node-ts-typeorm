import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from 'src/middlewares/isAuthenticated';
import ProfileController from '../controllers/ProfileController';

const controller = new ProfileController();

const router = Router();

router.use(isAuthenticated);

router.get('/', controller.show);

router.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      confirmation: Joi.string().valid(Joi.ref('password')).when('password', {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  controller.update,
);

export default router;
