import { inject, injectable } from "tsyringe";
import IAccountRepository from '@modules/account/repositories/IAccount.repository';
import Account from "../../typeorm/entities/Account";
import IUsersRepository from "@modules/users/repositories/IUsers.repository";

@injectable()
class AccountService {
  private accountRepository: IAccountRepository;
  private usersRepository: IUsersRepository;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('AccountRepository')
    accountRepository: IAccountRepository,
  ) {
    this.usersRepository = usersRepository;
    this.accountRepository = accountRepository;
  }
  public async execute(user_id: string): Promise<Account> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new Error("User not found");
    }


    const user = await this.accountRepository.create({ user: userExists.id });

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

export default AccountService;