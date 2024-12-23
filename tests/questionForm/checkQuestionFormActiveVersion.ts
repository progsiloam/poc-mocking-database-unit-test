import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { MockVobService } from '../mock/vobService.mock';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const checkQuestionFormActiveVersion = () => {
  describe('Mengembalikaan status active Question Form berdasarkan Major Id dan Version.', () => {
    let questionFormRepository: QuestionFormRepository;

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
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Mengembalikan "false" jika major id dan version tersebut tidak active', async () => {
      const result = await questionFormRepository.checkQuestionFormActiveVersion(1, 2);
      expect(result).toBe(false);
    });

    it('Mengembalikan "true" jika major id dan version tersebut active', async () => {
      const result = await questionFormRepository.checkQuestionFormActiveVersion(1, 1);
      expect(result).toBe(true);
    });
  });
};
