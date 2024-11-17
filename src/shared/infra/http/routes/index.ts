import { Router } from "express"

import usersRouter from '@modules/users/infra/http/routes/users.routes';
import accountRouter from '@modules/account/infra/http/routes/account.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/account', accountRouter);

export default routes;