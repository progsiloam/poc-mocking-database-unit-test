import { QuestionMaster } from '../../app/models/mongo/questionMaster.model';
import { QuestionMasterQuery } from '../../app/queries/mongo/questionMaster.query';
import { QuestionMasterRepository } from '../../app/repositories/questionMaster.repository';
import type { Questions } from '../../app/types/common.type';
import { seeding_question } from './seedingQuestionMaster';

export const getAllQuestionMaster = () => {
  describe('Mengembalikan semua data Question.', () => {
    let questionMasterRepository: QuestionMasterRepository;
    let result: Questions[];

    beforeAll(async () => {
      questionMasterRepository = new QuestionMasterRepository(new QuestionMasterQuery());
    });

    beforeEach(async () => {
      await QuestionMaster.insertMany(seeding_question); // Menyimpan seeding data Question Master
      result = await questionMasterRepository.getAllQuestions();
    });

    afterEach(async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
    });

    it('Semua data yang dikembalikan sudah sesuai dengan semua data yang di seeding', () => {
      seeding_question.forEach((seedingData) => {
        const fetchedData = result.find((x) => x.code === seedingData.code) as any;
        expect(fetchedData).toBeDefined();

        const { _id, ...fetchedDataMongo } = fetchedData._doc;
        const stringObjectId = _id.toString(); // Change new ObjectId to String
        expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(seedingData);
      });
    });

    it('Mengembalikan error "Questions not found" jika Questions tidak valid (data tidak ditemukan)', async () => {
      await QuestionMaster.deleteMany(); // Menghapus semua data Question Master
      await expect(questionMasterRepository.getAllQuestions()).rejects.toThrow('Questions not found');
    });
  });
};
