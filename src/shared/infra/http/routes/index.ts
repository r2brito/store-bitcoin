import { Router } from "express"

import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import accountRouter from '@modules/account/infra/http/routes/account.routes';
import transactionRouter from '@modules/transactions/infra/http/routes/transaction.routes';
import bitcoinRouter from '@modules/bitcoin/infra/http/routes/bitcoin.routes';

const routes = Router();

routes.use('/session', sessionsRouter);
routes.use('/users', usersRouter);
routes.use('/account', accountRouter);
routes.use('/transaction', transactionRouter);
routes.use('/bitcoin/ticker', bitcoinRouter);

export default routes;