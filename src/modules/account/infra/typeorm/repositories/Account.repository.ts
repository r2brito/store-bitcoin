import { Equal, Repository } from 'typeorm';
import { AppDataSource } from '@shared/infra/typeorm/database/data-source';

import Account from '@modules/account/infra/typeorm/entities/Account';

import IAccountRepository from '@modules/account/repositories/IAccount.repository';
import ICreateAccountDTO from '@modules/account/dtos/account.dto';

class AccountRepository implements IAccountRepository {
  private ormRepository: Repository<Account>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Account);
  }

  public async create({ user }: ICreateAccountDTO): Promise<Account> {
    const account = this.ormRepository.create({ user });

    await this.ormRepository.save(account);

    return account;
  }

  public async save(account: Account): Promise<Account> {
    return this.ormRepository.save(account);
  }

  public async findById(id: string): Promise<Account | null> {
    const account = await this.ormRepository.findOneBy({ id });

    return account;
  }

  public async findAll(): Promise<Account[]> {
    let accounts: Account[];

    accounts = await this.ormRepository.find();

    return accounts;
  }

  public async findByUserId(user_id: string): Promise<Account | null> {
    const account = await this.ormRepository.findOne({ where: { user: Equal(user_id) } });

    console.log("Account: ", account)

    return account;
  }
}

export default AccountRepository;
