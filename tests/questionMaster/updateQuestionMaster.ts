import { QuestionMaster } from '../../app/models/mongo/questionMaster.model';
import { QuestionMasterQuery } from '../../app/queries/mongo/questionMaster.query';
import { QuestionMasterRepository } from '../../app/repositories/questionMaster.repository';
import type { Questions } from '../../app/types/common.type';
import { seeding_question } from './seedingQuestionMaster';

export const updateQuestionMaster = () => {
  describe('Proses meng-update data Question.', () => {
    let questionMasterRepository: QuestionMasterRepository;
    const question: Questions & { _id: string } = {
      _id: '674e60bdbe39122c6d90a462',
      code: 'DQ00001',
      question_text: {
        id: 'dimana rumah anda?',
        eng: 'where is your home?',
      },
      input_type: 'Short Answer',
      options: [],
      question_score: 0,
      is_required: false,
    };

    beforeAll(async () => {
      questionMasterRepository = new QuestionMasterRepository(new QuestionMasterQuery());
    });

    beforeEach(async () => {
      await QuestionMaster.insertMany(seeding_question); // Menyimpan seeding data Question Master
    });

    afterEach(async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
    });

    it('Membandingkan data yang di update dengan yang sudah di update berdasarkan parameter yg dikirim (_id)', async () => {
      question.question_text.id = 'Apa yang terjadi ?';
      question.question_text.eng = 'What`s happen ?';
      await questionMasterRepository.saveAndUpdateQuestion(question);
      const questionMasters: any = await questionMasterRepository.getAllQuestions();
      const { _id, ...fetchedDataMongo } = questionMasters[1]._doc;
      const stringObjectId = _id.toString();
      expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(question);
    });

    it('Proses update hanya akan meng-update 1 data', async () => {
      question.question_text.id = 'Apa yang terjadi ?';
      question.question_text.eng = 'What`s happen ?';
      await questionMasterRepository.saveAndUpdateQuestion(question);
      const questionMasters: any = await questionMasterRepository.getAllQuestions();
      const updatedQuestions = questionMasters.filter((item) => {
        return (
          item._doc.code === question.code &&
          item._doc.question_text.id === question.question_text.id &&
          item._doc.question_text.eng === question.question_text.eng &&
          item._doc.input_type === question.input_type &&
          item._doc.question_score === question.question_score &&
          item._doc.is_required === question.is_required
        );
      });

      const { _id, ...fetchedDataMongo } = updatedQuestions[0]._doc;
      const stringObjectId = _id.toString();

      // Assert bahwa hanya ada satu data yang terupdate
      expect(updatedQuestions).toHaveLength(1);
      expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(question);
    });
  });
};
