import { Request, Response } from "express";
import { container } from 'tsyringe';

import BitcoinService from '../services/bitcoin.service';

class BItcoinController {
  public async show(req: Request, res: Response): Promise<Response> {
    const ticker = container.resolve(BitcoinService);

    const price = await ticker.show();

    return res.status(200).json(price);
  }

  async buyBitcoin(req: Request, res: Response): Promise<Response> {
    const { amount } = req.body;
    const userId = req.user.id;

    const buy = container.resolve(BitcoinService);

    const result = await buy.buyBitcoin(userId, amount);
    return res.status(100).json(result);
  }
}

export default BItcoinController;