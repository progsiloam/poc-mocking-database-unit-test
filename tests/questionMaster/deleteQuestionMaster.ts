import { QuestionMaster } from '../../app/models/mongo/questionMaster.model';
import { QuestionMasterQuery } from '../../app/queries/mongo/questionMaster.query';
import { QuestionMasterRepository } from '../../app/repositories/questionMaster.repository';
import { seeding_question } from './seedingQuestionMaster';

export const deleteQuestionMaster = () => {
  describe('Menghapus data Question.', () => {
    let questionMasterRepository: QuestionMasterRepository;
    let result: any;

    beforeAll(async () => {
      questionMasterRepository = new QuestionMasterRepository(new QuestionMasterQuery());
    });

    beforeEach(async () => {
      await QuestionMaster.insertMany(seeding_question);
      result = await QuestionMaster.find({});
    });

    afterEach(async () => {
      await QuestionMaster.deleteMany({});
    });

    it('Mengembalikan error "Question not found" jika Question tidak valid (data tidak ditemukan)', async () => {
      await questionMasterRepository.deleteQuestion(result[0]._id as string);
      await expect(questionMasterRepository.deleteQuestion(result[0]._id as string)).rejects.toThrow('Question not found');
    });

    it('Menghapus data Question berdasarkan parameter (questionId) yang dikirim', async () => {
      await questionMasterRepository.deleteQuestion(result[0]._id as string);
      const questionMaster = await QuestionMaster.find({});
      expect(questionMaster.length).toBe(1);
    });
  });
};
