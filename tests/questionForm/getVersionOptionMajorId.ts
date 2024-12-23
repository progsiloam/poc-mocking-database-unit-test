import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { MockVobService } from '../mock/vobService.mock';
import { seeding_expected_version_question_form_major_id, seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const getVersionOptionMajorId = () => {
  describe('Mengembalikkan version berdasarkan Major Id.', () => {
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

      result = await questionFormRepository.getVersionOptionByMajorId(36);
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Mengembalikan version sesuai dengan parameter (majorid)', () => {
      expect(seeding_expected_version_question_form_major_id).toMatchObject(result);
    });

    it('Mengembalikan error "Question Form not found" jika (majorId) tidak valid (data tidak ditemukan)', async () => {
      await QuestionForm.deleteMany({});
      await expect(questionFormRepository.getVersionOptionByMajorId(36)).rejects.toThrow('Question Form not found');
    });
  });
};
