import { logger } from '@siloamhospitals/erp-template-expressjs-library';
import mongoose from 'mongoose';
import * as pg from 'pg';
import { newDb } from 'pg-mem';
import { Sequelize } from 'sequelize';
import { config } from '../config';

pg.defaults.parseInt8 = true;

// Need to be set because if this is removed, Parser for NUMERIC will be not working
pg.types.setTypeParser(pg.types.builtins.OID, (stringValue) => {
  return stringValue;
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (stringValue) => {
  /**
   * Workaround to parse NUMERIC (1700) type to number
   * Because in Sequelize, DECIMAL / NUMERIC type will be parsed to string by default
   * https://github.com/sequelize/sequelize/issues/8019
   */
  return parseFloat(stringValue);
});

pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (stringValue) => {
  /**
   * Workaround to parse TIMESTAMP WITHOUT TIMEZONE correctly
   * https://github.com/sequelize/sequelize/issues/3000
   */
  return new Date(stringValue + '+0000');
});

// check mongo config
if (config.db.mongo.name === undefined) {
  throw new EvalError('DB Name Mongo is not configured');
}
if (config.db.mongo.user === undefined) {
  throw new EvalError('DB Username Mongo is not configured');
}
if (config.db.mongo.password === undefined) {
  throw new EvalError('DB Password Mongo is not configured');
}
if (config.db.mongo.host === undefined) {
  throw new EvalError('DB Host is Mongo not configured');
}

// check postgres config
if (config.db.name === undefined) {
  throw new EvalError('DB Name Postgres is not configured');
}
if (config.db.user === undefined) {
  throw new EvalError('DB Username Postgres is not configured');
}
if (config.db.password === undefined) {
  throw new EvalError('DB Password Postgres is not configured');
}
if (config.db.host === undefined) {
  throw new EvalError('DB Host Postgres is not configured');
}
if (config.db.dialect === undefined) {
  throw new EvalError('DB dialect Postgres is not configured');
}

async function connectToMongo() {
  await mongoose.connect(
    `mongodb://${config.db.mongo.user}:${config.db.mongo.password}@${config.db.mongo.host}:${config.db.mongo.port}/${config.db.mongo.name}?authSource=admin`,
  );
}

['connected', 'open', 'disconnected', 'reconnected', 'disconnecting', 'close'].forEach((event) =>
  mongoose.connection.on(event, () => logger.info(`MongoDB: ${event}`)),
);

let connectToPostgres: Sequelize;

if (process.env.MOCKING_DATABASE === 'true') {
  const db = newDb();
  connectToPostgres = new Sequelize({
    dialect: 'postgres',
    dialectModule: db.adapters.createPg(),
    logging: false,
    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
    dialectOptions: {
      useUTC: false,
    },
    timezone: '+07:00',
  }); // Untuk pengujian
} else {
  connectToPostgres = new Sequelize(config.db.name, config.db.user, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    pool: {
      max: config.db.pool.max,
      min: config.db.pool.min,
      acquire: config.db.pool.acquire,
      idle: config.db.pool.idle,
    },
    logging: (msg) => {
      if (config.db.logging) {
        logger.info(`[SEQUELIZE]: ${msg}`); // Log Sequelize queries to the file
      }
    },
    dialectOptions: {
      useUTC: false,
      ssl: config.db.ssl_require
        ? {
            require: true,
            rejectUnauthorized: false,
          }
        : null,
    },
    timezone: '+07:00',
  });
}

export { connectToMongo, connectToPostgres };
