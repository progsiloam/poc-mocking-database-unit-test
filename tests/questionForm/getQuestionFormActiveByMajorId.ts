import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { MockVobService } from '../mock/vobService.mock';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const getQuestionFormActiveByMajorId = () => {
  describe('Mengembalikkan Data Question Form yang Active berdasarkan Major Id.', () => {
    let questionFormRepository: QuestionFormRepository;
    let result: any;
    let questionFormActive: any;

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

      result = await questionFormRepository.getQuestionFormActiveByMajorId(1);
      questionFormActive = await QuestionFormActiveConfigModel.findAll({ where: { major_id: 1 } });
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Mengembalikan data yang sesuai dengan parameter (majorid)', () => {
      expect(questionFormActive.length).toBe(1);
      const { _id, ...fetchedDataMongo } = result._doc;
      const stringObjectId = _id.toString();
      expect({ _id: stringObjectId, ...fetchedDataMongo }).toMatchObject(seeding_question_form[1]);
    });

    it('Mengembalikan error "Question Form not found" jika (majorId) tidak valid (data tidak ditemukan)', async () => {
      await QuestionForm.deleteMany({});
      await expect(questionFormRepository.getQuestionFormActiveByMajorId(1)).rejects.toThrow('Question Form not found');
    });
  });
};
