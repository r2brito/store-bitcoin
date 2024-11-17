import { Request, Response } from "express";
import { container } from 'tsyringe';

import TransactionService from '../services/transaction.service';

class TransactionController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { amount } = req.body;
    const { id: user_id } = req.user;

    const createTransaction = container.resolve(TransactionService);

    const transaction = await createTransaction.execute(user_id, amount);

    return res.status(200).json(transaction);
  }

  public async index(req: Request, res: Response): Promise<Response> {

    const listAllAccounts = container.resolve(TransactionService);

    const accounts = await listAllAccounts.index();

    return res.status(200).json(accounts);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showAccount = container.resolve(TransactionService);

    const accounts = await showAccount.show(id);

    return res.status(200).json(accounts);
  }
}

export default TransactionController;