import { Router } from 'express';

import TransactionController from '../controllers/transaction.controller';
import ensureAuthentication from '@modules/users/infra/http/middlewares/EnsureAuthentication';

const transactionRouter = Router();

const transactioncontroller = new TransactionController();

transactionRouter.use(ensureAuthentication);

transactionRouter.post('/deposit', transactioncontroller.create);

transactionRouter.get('/', transactioncontroller.index);

transactionRouter.get('/:id', transactioncontroller.show);

export default transactionRouter;