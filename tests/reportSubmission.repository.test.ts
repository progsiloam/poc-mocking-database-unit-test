/**
 * Objective :  Untuk melacak riwayat perubahan yang dilakukan
 * Acceptance :
 *  1. Mengembalikan Report Document Pre-Qualification.
 *     a. Mengembalikan Report Document Pre-Qualification berdasarkan parameter (username, startDate, endDate)
 *        Note Point a : [Case 1]
 *                       - user yang login memiliki peran sebagai approver
 *                       [Case 2]
 *                       - user yang Login memiliki peran sebagai reviewer dan bukan approver
 **/

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo, connectToPostgres } from '../app/models/index';
import { getReportActionHistory } from './reportHistorySubmission/getReportActionHistory';

describe('Sequentially run Report Submission tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    try {
      if (process.env.MOCKING_DATABASE === 'true') {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
      } else {
        connectToMongo();
      }
      await connectToPostgres.query('CREATE SCHEMA IF NOT EXISTS cfg;');
      await connectToPostgres.query('CREATE SCHEMA IF NOT EXISTS trx;');
      await connectToPostgres.sync({ force: true });
    } catch (error) {
      console.error('Error setting up the database:', error);
    }
  });

  afterAll(async () => {
    try {
      // Clean up the database after tests
      if (process.env.MOCKING_DATABASE === 'true') {
        await mongoServer.stop();
      }
      await connectToPostgres.drop();
      await connectToPostgres.close();
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error cleaning up the database:', error);
    }
  });

  getReportActionHistory();
});
