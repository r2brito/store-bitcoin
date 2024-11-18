import { inject, injectable } from "tsyringe";
import Decimal from 'decimal.js';

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
  public async execute(user_id: string, amount: number): Promise<Transaction> {
    const accountExists = await this.accountRepository.findByUserId(user_id);

    if (!accountExists) {
      throw new Error("Account not found");
    }

    accountExists.balance = new Decimal(accountExists.balance).plus(amount).toNumber();

    await this.accountRepository.save(accountExists);

    const user = await this.transactionRepository.create({ account: accountExists.id, amount, type: TransactionType.DEPOSIT });

    return user;
  }

  public async index(): Promise<Transaction[]> {

    const accounts = await this.transactionRepository.findAll();

    return accounts;
  }

  public async show(id: string): Promise<Transaction | undefined> {
    const account = await this.transactionRepository.findById(id);

    if (!account) {
      throw new Error('Transaction not found');
    }

    return account;
  }
}

export default TransactionService;