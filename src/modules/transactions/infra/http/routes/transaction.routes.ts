import { Router } from 'express';

import TransactionController from '../controllers/transaction.controller';

const transactionRouter = Router();

const transactioncontroller = new TransactionController();

transactionRouter.post('/deposit', transactioncontroller.create);

transactionRouter.get('/', transactioncontroller.index);

transactionRouter.get('/:id', transactioncontroller.show);

export default transactionRouter;