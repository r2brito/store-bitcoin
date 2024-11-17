import { Router } from 'express';

import AccountController from '../controllers/account.controller';

const accountRouter = Router();

const accountcontroller = new AccountController();

accountRouter.post('/user/:id', accountcontroller.create);

accountRouter.get('/', accountcontroller.index);

accountRouter.get('/:id', accountcontroller.show);

export default accountRouter;