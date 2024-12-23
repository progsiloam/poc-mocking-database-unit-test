import type { FileConfig, JwtConfig } from '@siloamhospitals/erp-template-expressjs-library';
import type { Dialect } from 'sequelize';

interface AppConfig {
  host: string;
  port: number;
}

interface VobConfig {
  master_url: string;
}

interface MongoConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
}

interface DatabasePoolConfig {
  max: number;
  min: number;
  acquire: number;
  idle: number;
}

interface DatabaseConfig {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
  dialect: Dialect;
  logging: boolean;
  pool: DatabasePoolConfig;
  ssl_require: boolean;
  mongo: MongoConfig;
}

export interface EmailConfig {
  url: string;
  type: string;
  sender: string;
  displayName: string;
  cc: string;
  bcc: string;
}

export interface UnitTestConfig {
  mocking_database: boolean;
}

export interface Config {
  app: AppConfig;
  db: DatabaseConfig;
  jwt: JwtConfig;
  email: EmailConfig;
  file: FileConfig;
  vob: VobConfig;
  unit_test: UnitTestConfig;
}
