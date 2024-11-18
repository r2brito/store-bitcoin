import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ITransactionDTO from '@modules/transactions/dtos/transaction.dto';

export default interface ITransactionRepository {
  findById(id: string): Promise<Transaction | null>;
  findAll(): Promise<Transaction[]>;
  create(data: ITransactionDTO): Promise<Transaction>;
  save(transaction: Transaction): Promise<Transaction>;
}
