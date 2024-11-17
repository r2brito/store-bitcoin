import Account from '@modules/account/infra/typeorm/entities/Account';
import IAccountDTO from '@modules/account/dtos/account.dto';

export default interface IAccountRepository {
  findById(id: string): Promise<Account | null>;
  findAll(): Promise<Account[]>;
  create(data: IAccountDTO): Promise<Account>;
  save(account: Account): Promise<Account>;
}
