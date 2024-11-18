import {
  MAIL_DRIVER,
  MAIL_OWNER,
  MAIL_DOMAIN,
  SENDGRID_API_KEY,
} from '@shared/utils/environment';

interface IMailConfig {
  driver: 'sendgrid';
  defaults: {
    from: {
      name: string;
      email: string;
    };
  };
}

export default {
  driver: MAIL_DRIVER,
  defaults: {
    from: {
      name: MAIL_OWNER,
      email: MAIL_DOMAIN,
    },
  },
  sendgrid: {
    apiKey: SENDGRID_API_KEY,
  },
} as IMailConfig;
