import { QuestionMaster } from '../../app/models/mongo/questionMaster.model';
import { QuestionMasterQuery } from '../../app/queries/mongo/questionMaster.query';
import { QuestionMasterRepository } from '../../app/repositories/questionMaster.repository';
import { seeding_question } from './seedingQuestionMaster';

export const getQuestionMasterById = () => {
  describe('Mengembalikan Data Question berdasarkan QuestionId.', () => {
    let questionMasterRepository: QuestionMasterRepository;
    const questionId = '674e60bdbe39122c6d90a462';
    let result: any;

    beforeAll(async () => {
      questionMasterRepository = new QuestionMasterRepository(new QuestionMasterQuery());
    });

    beforeEach(async () => {
      await QuestionMaster.insertMany(seeding_question); // Menyimpan seeding data Question Master
      result = await questionMasterRepository.getQuestionById(questionId);
    });

    afterEach(async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
    });

    it('Mengembalikan data yang sesuai dengan parameter (questionId)', async () => {
      expect(result).toBeDefined();
      const { _id, ...fetchedDataMongo } = result._doc;
      const stringObjectId = _id.toString(); // Change new ObjectId to String
      expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(seeding_question[0]);
    });

    it('Mengembalikan error "Question not found" jika (questionId) tidak valid (data tidak ditemukan)', async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
      await expect(questionMasterRepository.getQuestionById(questionId)).rejects.toThrow('Question not found');
    });
  });
};
