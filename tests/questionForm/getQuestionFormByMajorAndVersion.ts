import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { MockVobService } from '../mock/vobService.mock';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const getQuestionFormByMajorIdAndVersion = () => {
  describe('Mengembalikkan Data Question Form berdasarkan Major Id dan Version.', () => {
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

      result = await questionFormRepository.getQuestionFormByMajorIdAndVersion(0, 1);
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Mengembalikan data yang sesuai dengan parameter (majorid, version)', () => {
      const seedingData = seeding_question_form.find((x) => x._id === result._id.toString()) as any;
      const { _id, ...fethedDataMongo } = result._doc;
      const stringObjectId = _id.toString();
      expect({ _id: stringObjectId, ...fethedDataMongo }).toMatchObject(seedingData);
    });

    it('Mengembalikan error "Question Form not found" jika (majorId, version) tidak valid (data tidak ditemukan)', async () => {
      await QuestionForm.deleteMany({});
      await expect(questionFormRepository.getQuestionFormByMajorIdAndVersion(0, 1)).rejects.toThrow('Question Form not found');
    });
  });
};
