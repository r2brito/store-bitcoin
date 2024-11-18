import { Router } from 'express';

import BitcoinController from '../controllers/bitcoin.controller';
import ensureAuthentication from '@modules/users/infra/http/middlewares/EnsureAuthentication';

const bitcoinRouter = Router();

const bitcoinController = new BitcoinController();

bitcoinRouter.use(ensureAuthentication);

bitcoinRouter.get('/', bitcoinController.show);
bitcoinRouter.post('/buy', bitcoinController.buyBitcoin);

export default bitcoinRouter;