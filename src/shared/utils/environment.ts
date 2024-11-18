import * as dotenv from 'dotenv';

dotenv.config();
const path = `${__dirname}/../../../.env`;

dotenv.config({ path });

export const { AUTH_SECRET } = process.env;
export const { TOKEN_EXPIRATION_TIME } = process.env;
export const { MAIL_DRIVER } = process.env;
export const { MAIL_OWNER } = process.env;
export const { MAIL_DOMAIN } = process.env;
export const { SENDGRID_API_KEY } = process.env;