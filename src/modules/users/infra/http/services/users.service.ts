import { inject, injectable } from "tsyringe";
import path from 'path';
import IUserDTO from "@modules/users/dtos/user.dto";
import IUsersRepository from '@modules/users/repositories/IUsers.repository';
import IMailProvider from "@shared/container/providers/MailProvider/models/IMailProvider";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";
import User from "../../typeorm/entities/User";

@injectable()
class UsersService {
  private usersRepository: IUsersRepository;

  private hashProvider: IHashProvider;
  private mailProvider: IMailProvider;

  constructor(
    @inject('UsersRepository')
    usersRepository: IUsersRepository,

    @inject('HashProvider')
    hashProvider: IHashProvider,

    @inject('MailProvider')
    mailProvider: IMailProvider,
  ) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.mailProvider = mailProvider;
  }
  public async execute({ name, email, password }: IUserDTO): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new Error("Email already in use");
    }

    const hash_password = await this.hashProvider.generateHash(password);


    const user = await this.usersRepository.create({ name, email, password: hash_password });

    await this.mailProvider.sendMail({
      to: { name: 'User Name', email: 'user@example.com' },
      from: { name: 'Your Company', email: 'no-reply@yourdomain.com' },
      subject: 'Bem-vindo!',
      templateData: {
        file: path.resolve(__dirname, '..', 'views', 'new_user.hbs'),
        variables: { name: 'User Name' },
      },
    });


    return user;
  }

  public async index(): Promise<User[]> {

    const users = await this.usersRepository.findAll();

    return users;
  }

  public async show(id: string): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default UsersService;