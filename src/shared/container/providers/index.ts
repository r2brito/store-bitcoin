import { container } from 'tsyringe';
import mailConfig from '@config/mail';

import IMailProvider from './MailProvider/models/IMailProvider';
import SendGridMailProvider from './MailProvider/implementations/SendGridMailProvider';

const providers = {
  sendgrid: SendGridMailProvider,
};

container.registerSingleton<IMailProvider>(
  'MailProvider',
  providers.sendgrid,
);