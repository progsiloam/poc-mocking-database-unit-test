import * as dotenv from 'dotenv';
import type { Dialect } from 'sequelize';
import { type Config } from '../types/config.type';

if (process.env.NODE_ENV === 'test') {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
  });
} else {
  dotenv.config();
}

export const config: Config = {
  app: {
    host: process.env.APP_HOST as string,
    port: Number(process.env.APP_PORT),
  },
  db: {
    host: process.env.DB_HOST as string,
    name: process.env.DB_NAME as string,
    user: process.env.DB_USER as string,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD as string,
    dialect: process.env.DB_DIALECT as string as Dialect,
    logging: JSON.parse(process.env.DB_LOGGING ?? 'false'),
    pool: {
      max: Number(process.env.DB_POOL_MAX),
      min: Number(process.env.DB_POOL_MIN),
      acquire: Number(process.env.DB_POOL_ACQUIRE),
      idle: Number(process.env.DB_POOL_IDLE),
    },
    ssl_require: JSON.parse(process.env.DB_SSL_REQUIRE ?? 'false'),
    mongo: {
      host: process.env.DB_HOST_MONGO as string,
      port: Number(process.env.DB_PORT_MONGO),
      name: process.env.DB_NAME_MONGO as string,
      user: process.env.DB_USER_MONGO as string,
      password: process.env.DB_PASSWORD_MONGO as string,
    },
  },
  jwt: {
    key: process.env.JWT_KEY as string,
    issuer: process.env.JWT_ISSUER as string,
    audience: process.env.JWT_AUDIENCE as string,
    access_token_expires_minutes: Number(process.env.JWT_ACCESS_TOKEN_EXPIRES_MINUTES),
    refresh_token_expires_minutes: Number(process.env.JWT_REFRESH_TOKEN_EXPIRES_MINUTES),
  },
  email: {
    url: process.env.EMAIL_URL as string,
    type: process.env.EMAIL_TYPE as string,
    sender: process.env.EMAIL_SENDER as string,
    displayName: process.env.EMAIL_DISPLAY_NAME as string,
    cc: process.env.EMAIL_CC as string,
    bcc: process.env.EMAIL_BCC as string,
  },
  file: {
    file_size_limit_mb: Number(process.env.FILE_SIZE_LIMIT_MB),
    file_base_path: process.env.FILE_PATH as string,
  },
  vob: {
    master_url: process.env.VOB_MASTER_URL as string,
  },
  unit_test: {
    mocking_database: JSON.parse(process.env.MOCKING_DATABASE ?? 'false'),
  },
};
