import { inject, injectable } from "tsyringe";
import IAccountRepository from '@modules/account/repositories/IAccount.repository';
import ITransactionRepository from '@modules/transactions/repositories/ITransaction.repository';
import IUsersRepository from "@modules/users/repositories/IUsers.repository";

import Transaction from "../../typeorm/entities/Transaction";
import { TransactionType } from "@modules/transactions/enum/TransactionType";

@injectable()
class TransactionService {
  private accountRepository: IAccountRepository;
  private transactionRepository: ITransactionRepository;
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('AccountRepository')
    accountRepository: IAccountRepository,

    @inject('TransactionRepository')
    transactionRepository: ITransactionRepository,
  ) {
    this.usersRepository = usersRepository;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }
  public async execute(account_id: string, amount: number): Promise<Transaction> {
    const accountExists = await this.accountRepository.findByUserId(account_id);

    if (!accountExists) {
      throw new Error("Account not found");
    }


    const user = await this.transactionRepository.create({ account: accountExists.id, amount, type: TransactionType.DEPOSIT });

    return user;
  }

  public async index(): Promise<Account[]> {

    const accounts = await this.accountRepository.findAll();

    return accounts;
  }

  public async show(id: string): Promise<Account | undefined> {
    const account = await this.accountRepository.findById(id);

    if (!account) {
      throw new Error('Account not found');
    }

    return account;
  }
}

export default TransactionService;