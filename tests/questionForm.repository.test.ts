/**
 * Objective : Manage dan Mengolah Data Master untuk Question Form
 * Acceptance :
 *  1. Mengembalikkan Semua Data Question Form yang active.
 *     a. Mengembalikan 10 data version yang active dari total 14 seeding data
 *        Note Point a : - Untuk Mengembalikkan data, seeding questionFormActiveConfig table terlebih dahulu dengan jumlah 10 data,
 *                         yaitu dengan data major_id 0 hingga 9 dan masing-masing major memiliki version active di questionFormActiveConfig,
 *                         attribute Question Form Active yang sesuai (major_id, version)
 *                       - Mengembalikan Question Form yang active berdasarkan Major Id, attribute yang sesuai (version, total_question)
 *     b. Membandingkan Major Name sesuai dengan Mocking VOB service
 *     c. Mengembalikan error "Question Forms not found" jika Question Forms tidak valid (data tidak ditemukan)
 *  2. Mengembalikkan Data Question Form berdasarkan Major Id dan Version.
 *     a. Mengembalikan data yang sesuai dengan parameter (majorid, version)
 *     b. Mengembalikan error "Question Form not found" jika (majorId, version) tidak valid (data tidak ditemukan)
 *  3. Mengembalikkan version berdasarkan Major Id.
 *     a. Mengembalikan version sesuai dengan parameter (majorid)
 *     b. Mengembalikan error "Question Form not found" jika (majorId) tidak valid (data tidak ditemukan)
 *  4. Mengembalikkan Data Question Form yang Active berdasarkan Major Id.
 *     a. Mengembalikan data yang sesuai dengan parameter (majorid)
 *        Note Point a : - Mengembalikan Question Form yang active, attribute yang sesuai (version)
 *     b. Mengembalikan error "Question Form not found" jika (majorId) tidak valid (data tidak ditemukan)
 *  5. Mengembalikaan status active Question Form berdasarkan Major Id dan Version.
 *     a. Mengembalikan "false" jika major id dan version tersebut tidak active
 *     b. Mengembalikan "true" jika major id dan version tersebut active
 *  6. Proses meng-update data Question Form.
 *     a. Membandingkan data yang akan di update dengan yang sudah di update berdasarkan parameter yg dikirim (majorId, version)
 *     b. Proses update hanya akan meng-update 1 data
 *         Note Point b : - Bandingkan seeding_datas, bandingkan berapa banyak yang berubah ? misal 1 data, jika iya maka itu benar. Jika tidak, maka itu salah
 *  7. Proses menyimpan version baru dari Question Form.
 *     a. Membandingkan data dari version yang baru dengan latest version yang lama.
 *     b. Proses hanya menyimpan 1 data version baru.
 *  8. Proses meng-aktifkan version Question Form yang baru.
 *     a. Proses akan meng-update 1 data
 *        Note Point a : - Jika Question Form Active Config Mengembalikan 1 data berdasarkan Major Id
 *                       - Data yang di update harus sesuai dengan parameter yang dikirim yaitu (Major Id, version)
 *     b. Proses akan menyimpan 1 data
 *        Note Point b : Jika Question Form Active Config Tidak Mengembalikan 1 data berdasarkan Major Id
 *     c. Data Question Form yang disimpan sama dengan data yang dikirim (seeding)
 *     d. proses menyimpan history perubahan question form yang aktif dari yang sebelumnya hingga latest version (table questionFormActiveHistory)
 **/

import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectToMongo, connectToPostgres } from '../app/models/index';
import { checkQuestionFormActiveVersion } from './questionForm/checkQuestionFormActiveVersion';
import { getAllQuestionFormActive } from './questionForm/getAllQuestionFormActive';
import { getQuestionFormActiveByMajorId } from './questionForm/getQuestionFormActiveByMajorId';
import { getQuestionFormByMajorIdAndVersion } from './questionForm/getQuestionFormByMajorAndVersion';
import { getVersionOptionMajorId } from './questionForm/getVersionOptionMajorId';
import { setActiveVersionQuestionForm } from './questionForm/setActiveQuestionForm';
import { setNewVersionQuestionForm } from './questionForm/setNewQuestionForm';
import { updateQuestionForm } from './questionForm/updateQuestionForm';

describe('Sequentially run Question Form tests', () => {
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

  getAllQuestionFormActive();
  getQuestionFormByMajorIdAndVersion();
  getVersionOptionMajorId();
  getQuestionFormActiveByMajorId();
  checkQuestionFormActiveVersion();
  updateQuestionForm();
  setNewVersionQuestionForm();
  setActiveVersionQuestionForm();
});
