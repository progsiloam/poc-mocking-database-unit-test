import { ShgError } from '@siloamhospitals/erp-template-expressjs-library';
import { QuestionMaster } from '../models/mongo/questionMaster.model';

export const generateNewQuestionCode = async () => {
  try {
    // Ambil dokumen dengan kode terbesar
    const lastQuestion = await QuestionMaster.findOne()
      .sort({ code: -1 }) // Urutkan descending berdasarkan kode
      .exec();

    if (lastQuestion) {
      // Ambil angka dari kode terakhir
      const lastCodeNumber = parseInt(lastQuestion.code!.replace('DQ', ''), 10);
      // Tambah 1 untuk kode baru
      const newCode = `DQ${String(lastCodeNumber + 1).padStart(5, '0')}`;
      return newCode;
    } else {
      // Jika tidak ada dokumen, mulai dari DQ00001
      return 'DQ00001';
    }
  } catch (error) {
    throw new ShgError('Failed to generate question code');
  }
};
