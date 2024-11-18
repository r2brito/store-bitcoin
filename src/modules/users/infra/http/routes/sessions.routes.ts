import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/sessions.controller';

const sessionsController = new SessionsController();
const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.create,
);

export default sessionsRouter;
