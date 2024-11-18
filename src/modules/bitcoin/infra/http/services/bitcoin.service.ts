import { inject, injectable } from "tsyringe";
import axios from 'axios';
import IAccountRepository from "@modules/account/repositories/IAccount.repository";
import IUsersRepository from "@modules/users/repositories/IUsers.repository";
import ITransactionRepository from "@modules/transactions/repositories/ITransaction.repository";
import AppError from "@shared/errors/AppError";
import { TransactionType } from "@modules/transactions/enum/TransactionType";

@injectable()
class BitcoinService {
  private readonly API_URL = 'https://www.mercadobitcoin.net/api/BTC/ticker/';

  private accountRepository: IAccountRepository;
  private transactionRepository: ITransactionRepository;

  constructor(
    @inject('TransactionRepository')
    transactionRepository: ITransactionRepository,

    @inject('AccountRepository')
    accountRepository: IAccountRepository,
  ) {
    this.transactionRepository = transactionRepository;
    this.accountRepository = accountRepository;
  }

  public async show(): Promise<{ buy: number; sell: number; last: number }> {
    try {
      const response = await axios.get(this.API_URL);
      const { buy, sell, last } = response.data.ticker;

      return {
        buy: parseFloat(buy),
        sell: parseFloat(sell),
        last: parseFloat(last),
      };
    } catch (error) {
      console.error('Error fetching Bitcoin ticker:', error);
      throw new Error('Could not fetch Bitcoin prices. Please try again later.');
    }
  }

  public async buyBitcoin(user_id: string, amountInReais: number): Promise<{ bitcoinAmount: number; balance: number }> {
    const account = await this.accountRepository.findByUserId(user_id);

    if (!account) {
      throw new AppError('Account not found');
    }

    if (account.balance < amountInReais) {
      throw new AppError('Insufficient balance');
    }

    const { sell } = await this.show();
    const sellPrice = parseFloat(sell);

    const bitcoinAmount = amountInReais / sellPrice;

    account.balance -= amountInReais;
    await this.accountRepository.save(account);

    const transaction = this.transactionRepository.create({
      account: account.id,
      amount: amountInReais,
      type: TransactionType.BUY,
      details: `Purchased ${bitcoinAmount} BTC at ${sellPrice} BRL`,
    });
    await this.transactionRepository.save(transaction);

    return {
      bitcoinAmount,
      balance: account.balance,
    };
  }
}

export default BitcoinService;