import { container } from 'tsyringe';

import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsers.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/Users.repository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);