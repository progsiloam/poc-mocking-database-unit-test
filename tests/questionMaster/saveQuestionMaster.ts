import { QuestionMaster } from '../../app/models/mongo/questionMaster.model';
import { QuestionMasterQuery } from '../../app/queries/mongo/questionMaster.query';
import { QuestionMasterRepository } from '../../app/repositories/questionMaster.repository';
import type { Questions } from '../../app/types/common.type';

export const saveQuestionMaster = () => {
  describe('Proses penyimpanan data Question.', () => {
    let questionMasterRepository: QuestionMasterRepository;
    let result: any;
    const question: Questions = {
      code: 'DQ00001',
      question_text: {
        id: 'Maybe No',
        eng: 'Mungkin Tidak',
      },
      input_type: 'Paragraph',
      options: [],
      question_score: 0,
      is_required: false,
    };

    beforeAll(async () => {
      questionMasterRepository = new QuestionMasterRepository(new QuestionMasterQuery());
    });

    beforeEach(async () => {
      await questionMasterRepository.saveAndUpdateQuestion(question);
      result = await questionMasterRepository.getAllQuestions();
    });

    afterEach(async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
    });

    it('Proses menyimpan 1 data', () => {
      expect(result.length).toBe(1);
    });

    it('Membandingkan data yang akan disimpan dengan yang sudah tersimpan', () => {
      const { _id, ...fetchedDataMongo } = result[0]._doc;
      expect({ _id, ...fetchedDataMongo }).toMatchObject({ _id, ...question });
    });
  });
};
