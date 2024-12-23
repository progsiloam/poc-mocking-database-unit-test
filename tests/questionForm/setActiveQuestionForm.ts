import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { VobService } from '../../app/services/vob.service';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const setActiveVersionQuestionForm = () => {
  describe('Proses meng-aktifkan version Question Form yang baru.', () => {
    let questionFormRepository: QuestionFormRepository;
    let questionFormActive: any;

    beforeAll(async () => {
      questionFormRepository = new QuestionFormRepository(
        new QuestionFormQuery(),
        new QuestionFormActiveConfigQuery(),
        new QuestionFormActiveHistoryQuery(),
        new VobService(),
      );
    });

    beforeEach(async () => {
      await QuestionFormActiveConfigModel.bulkCreate(seeding_question_form_active_config, {
        updateOnDuplicate: ['major_id', 'version'],
      }); // Menyimpan seeding data Question Form Active Config
      await QuestionForm.insertMany(seeding_question_form); // Menyimpan seeding data Question Form

      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await questionFormRepository.setQuestionFormActiveVersion({ major_id: 1, version: 2 }, { username: 'jhone', role_ids: [1] });
      questionFormActive = await QuestionFormActiveConfigModel.findAll({ where: { major_id: 1 } });
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Proses akan meng-update 1 data', async () => {
      expect(questionFormActive.length).toBe(1);
      expect(questionFormActive[0].major_id).toBe(1);
      expect(questionFormActive[0].version).toBe(2);
      const checkVersionActiveORNot = await questionFormRepository.checkQuestionFormActiveVersion(1, 2);
      expect(checkVersionActiveORNot).toBe(true);
    });

    it('Proses akan menyimpan 1 data', async () => {
      expect(questionFormActive.length).toBe(1);
      expect(questionFormActive[0].major_id).toBe(1);
      expect(questionFormActive[0].version).toBe(2);
      const checkVersionActiveORNot = await questionFormRepository.checkQuestionFormActiveVersion(1, 2);
      expect(checkVersionActiveORNot).toBe(true);
    });

    it('Data Question Form yang disimpan sama dengan data yang dikirim (seeding)', () => {
      const expected = {
        major_id: 1,
        version: 2,
      };
      const result = {
        major_id: questionFormActive[0].major_id,
        version: questionFormActive[0].version,
      };
      expect(expected).toMatchObject(result);
    });

    it('proses menyimpan history perubahan question form yang aktif dari yang sebelumnya hingga latest version.', async () => {
      const history = await QuestionFormActiveHistoryModel.findAll({ where: { major_id: 1 } });
      expect(history.length).toBe(1);
    });
  });
};
