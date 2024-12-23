/**
 * Objective : Manage dan Mengolah Data Master untuk Question
 * Acceptance :
 *  1. Mengembalikan semua data Question.
 *     a. Semua data yang dikembalikan sudah sesuai dengan semua data yang di seeding
 *     b. Mengembalikan error "Questions not found" jika Questions tidak valid (data tidak ditemukan)
 *  2. Mengembalikan Data Question berdasarkan QuestionId.
 *     a. Mengembalikan data yang sesuai dengan parameter (questionId)
 *     b. Mengembalikan error "Question not found" jika (questionId) tidak valid (data tidak ditemukan)
 *  3. Proses penyimpanan data Question.
 *     a. Proses menyimpan 1 data
 *     b. Membandingkan data yang akan disimpan dengan yang sudah tersimpan
 *  4. Proses meng-update data Question.
 *     a. Membandingkan data yang di update dengan yang sudah di update berdasarkan parameter yg dikirim (_id)
 *     b. Proses update hanya akan meng-update 1 data
 *        - bandingkan seeding_datas bandingkan berapa banyak yang berubah ? misal 1 data, jika iya maka itu benar. Jika tidak, maka itu salah
 *   5. Menghapus data Question.
 *     a. Menghapus data Question berdasarkan parameter (questionId) yang dikirim
 *     b. Mengembalikan error "Question not found" jika (questionId) tidak valid (data tidak ditemukan)
 **/

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo } from '../app/models/index';
import { deleteQuestionMaster } from './questionMaster/deleteQuestionMaster';
import { getAllQuestionMaster } from './questionMaster/getAllQuestionMaster';
import { getQuestionMasterById } from './questionMaster/getQuestionMasterById';
import { saveQuestionMaster } from './questionMaster/saveQuestionMaster';
import { updateQuestionMaster } from './questionMaster/updateQuestionMaster';

describe('Sequentially run Question Master tests', () => {
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
      await mongoose.disconnect();
    } catch (error) {
      console.error('Error cleaning up the database:', error);
    }
  });

  getAllQuestionMaster();
  getQuestionMasterById();
  saveQuestionMaster();
  updateQuestionMaster();
  deleteQuestionMaster();
});
