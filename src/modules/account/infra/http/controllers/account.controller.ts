import { Request, Response } from "express";
import { container } from 'tsyringe';

import AccountService from '../services/account.service';

class AccountController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.params;

    const createAccount = container.resolve(AccountService);

    const account = await createAccount.execute(user_id);

    return res.status(200).json(account);
  }

  public async index(req: Request, res: Response): Promise<Response> {

    const listAllAccounts = container.resolve(AccountService);

    const accounts = await listAllAccounts.index();

    return res.status(200).json(accounts);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const showAccount = container.resolve(AccountService);

    const accounts = await showAccount.show(id);

    return res.status(200).json(accounts);
  }
}

export default AccountController;