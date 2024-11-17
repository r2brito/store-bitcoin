import { Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm/database/data-source';

import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';

import ITransactionRepository from '@modules/transactions/repositories/ITransaction.repository';
import ICreateTransactionDTO from '@modules/transactions/dtos/transaction.dto';

class TransactionRepository implements ITransactionRepository {
  private ormRepository: Repository<Transaction>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Transaction);
  }

  public async create({ account, amount, type }: ICreateTransactionDTO): Promise<Transaction> {
    const transaction = this.ormRepository.create({ account, amount, type });

    await this.ormRepository.save(transaction);

    return transaction;
  }

  public async save(transaction: Transaction): Promise<Transaction> {
    return this.ormRepository.save(transaction);
  }

  public async findById(id: string): Promise<Transaction | null> {
    const account = await this.ormRepository.findOneBy({ id });

    return account;
  }

  public async findAll(): Promise<Transaction[]> {
    let transactions: Transaction[];

    transactions = await this.ormRepository.find();

    return transactions;
  }
}

export default TransactionRepository;
