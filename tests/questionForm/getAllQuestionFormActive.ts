import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { req } from '../data';
import { MockVobService } from '../mock/vobService.mock';
import { seeding_expected_question_form, seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const getAllQuestionFormActive = () => {
  describe('Mengembalikkan Semua Data Question Form yang active.', () => {
    let questionFormRepository: QuestionFormRepository;
    let result: any;

    beforeAll(async () => {
      questionFormRepository = new QuestionFormRepository(
        new QuestionFormQuery(),
        new QuestionFormActiveConfigQuery(),
        new QuestionFormActiveHistoryQuery(),
        new MockVobService(),
      );
    });

    beforeEach(async () => {
      await QuestionFormActiveConfigModel.bulkCreate(seeding_question_form_active_config, {
        updateOnDuplicate: ['major_id', 'version'],
      }); // Menyimpan seeding data Question Form Active Config
      await QuestionForm.insertMany(seeding_question_form); // Menyimpan seeding data Question Form

      result = await questionFormRepository.getAllQuestionFormsActive(req as any);
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Mengembalikan 10 data version yang active dari total 14 seeding data', async () => {
      const questionFormActiveConfig = await QuestionFormActiveConfigModel.findAll({});
      expect(questionFormActiveConfig.length).toBe(10);
      expect(result.length).toBe(10);
      seeding_expected_question_form.forEach((seedingData) => {
        const fetchedData = result.find((x) => x._id.toString() === seedingData._id) as any;
        expect(fetchedData).toBeDefined();

        const { _id, ...fetchedDataMongo } = fetchedData;
        const stringObjectId = _id.toString(); // Change new ObjectId to String
        expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(seedingData);
      });
    });

    // it('Membandingkan Major Name sesuai dengan Mocking VOB service', async () => {
    //   const expectedResult = seeding_expected_question_form.map((seedingData) => {
    //     const fetchedData = result.find((x) => x._id.toString() === seedingData._id) as any;
    //     return {
    //       value: seedingData.major_id,
    //       label: fetchedData.major_name,
    //     };
    //   });
    //   const received = result.map((result) => {
    //     return {
    //       label: result.major_name,
    //       value: result.major_id,
    //     };
    //   });
    //   expect(expectedResult).toMatchObject(received);
    // });

    // it('Mengembalikan error "Question Forms not found" jika Question Forms tidak valid (data tidak ditemukan)', async () => {
    //   await QuestionForm.deleteMany({});
    //   await expect(questionFormRepository.getAllQuestionFormsActive(req as any)).rejects.toThrow('Question Forms not found');
    // });
  });
};
