import { inject, injectable } from "tsyringe";
import Decimal from 'decimal.js';

import IAccountRepository from '@modules/account/repositories/IAccount.repository';
import ITransactionRepository from '@modules/transactions/repositories/ITransaction.repository';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IUsersRepository from "@modules/users/repositories/IUsers.repository";

import Transaction from "../../typeorm/entities/Transaction";
import { TransactionType } from "@modules/transactions/enum/TransactionType";
import path from "path";

@injectable()
class TransactionService {
  private usersRepository: IUsersRepository;
  private accountRepository: IAccountRepository;
  private transactionRepository: ITransactionRepository;
  private mailProvider: IMailProvider;

  constructor(
    @inject('MailProvider')
    mailProvider: IMailProvider,

    @inject('AccountRepository')
    accountRepository: IAccountRepository,

    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('TransactionRepository')
    transactionRepository: ITransactionRepository,
  ) {
    this.mailProvider = mailProvider;
    this.usersRepository = usersRepository;
    this.accountRepository = accountRepository;
    this.transactionRepository = transactionRepository;
  }
  public async execute(user_id: string, amount: number): Promise<Transaction> {
    const accountExists = await this.accountRepository.findByUserId(user_id);

    const user = await this.usersRepository.findById(user_id);

    if (!accountExists) {
      throw new Error("Account not found");
    }

    accountExists.balance = new Decimal(accountExists.balance).plus(amount).toNumber();

    await this.accountRepository.save(accountExists);

    const transaction = await this.transactionRepository.create({ account: accountExists.id, amount, type: TransactionType.DEPOSIT });

    await this.mailProvider.sendMail({
      to: { name: user.name, email: user.email },
      from: { name: 'Your Company', email: 'no-reply@yourdomain.com' },
      subject: 'Deposit!',
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'deposit.hbs'),
        variables: { name: user?.name, amount: transaction.amount },
      },
    });

    return transaction;
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