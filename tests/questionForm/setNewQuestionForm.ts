import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { VobService } from '../../app/services/vob.service';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const setNewVersionQuestionForm = () => {
  describe('Proses menyimpan version baru dari Question Form.', () => {
    let questionFormRepository: QuestionFormRepository;
    let version: number[];
    let newVersion: any;
    const questionForm = {
      major_id: seeding_question_form[1].major_id,
      static_question: seeding_question_form[1].static_question,
      dynamic_question: seeding_question_form[1].dynamic_question,
    };

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

      await questionFormRepository.setNewVersionQuestionForm(1, { username: 'jhone', role_ids: [1] });
      newVersion = await questionFormRepository.getQuestionFormByMajorIdAndVersion(1, 2);
      version = await questionFormRepository.getVersionOptionByMajorId(1);
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Membandingkan data dari version yang baru dengan latest version yang lama', () => {
      expect(newVersion.major_id).toBe(questionForm.major_id);
      expect(newVersion.static_question).toMatchObject(questionForm.static_question);
      expect(newVersion.dynamic_question).toMatchObject(questionForm.dynamic_question);
    });

    it('Proses hanya menyimpan 1 data version baru', () => {
      // version sebelumnya hanya 1
      expect(version.length).toBe(2);
    });
  });
};
