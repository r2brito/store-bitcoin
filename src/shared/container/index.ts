import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsers.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/Users.repository';

import IAccountRepository from '@modules/account/repositories/IAccount.repository';
import AccountRepository from '@modules/account/infra/typeorm/repositories/Account.repository';

import ITransactionRepository from '@modules/transactions/repositories/ITransaction.repository';
import TransactionRepository from '@modules/transactions/infra/typeorm/repositories/Transaction.repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IAccountRepository>(
  'AccountRepository',
  AccountRepository,
);

container.registerSingleton<ITransactionRepository>(
  'TransactionRepository',
  TransactionRepository,
);