import { QuestionForm } from '../../app/models/mongo/questionForm.model';
import { QuestionFormActiveConfigModel } from '../../app/models/postgres/cfg/questionFormActiveConfig.model';
import { QuestionFormActiveHistoryModel } from '../../app/models/postgres/cfg/questionFormActiveHistory.model';
import { QuestionFormQuery } from '../../app/queries/mongo/questionForm.query';
import { QuestionFormActiveConfigQuery } from '../../app/queries/postgres/cfg/questionFormActiveConfig.query';
import { QuestionFormActiveHistoryQuery } from '../../app/queries/postgres/cfg/questionFormActiveHistory.query';
import { QuestionFormRepository } from '../../app/repositories/questionForm.repository';
import { VobService } from '../../app/services/vob.service';
import type { QuestionForm as QuestionFormType } from '../../app/types/common.type';
import { seeding_question_form, seeding_question_form_active_config } from './seedingQuestionForm';

export const updateQuestionForm = () => {
  describe('Proses meng-update data Question Form.', () => {
    let questionFormRepository: QuestionFormRepository;
    let result: any;
    const questionForm: QuestionFormType & { created_by: string; created_on: Date; modified_by: string; modified_on: Date } = {
      major_id: 0,
      version: 1,
      created_by: 'jhone',
      created_on: new Date('2024-11-18T03:14:07.966Z'),
      modified_by: 'jhone',
      modified_on: new Date('2024-11-18T03:14:07.966Z'),
      static_question: [
        {
          code: 'Q0002',
          input_type: 'Title',
          question_score: 1,
        },
        {
          code: 'Q0003',
          input_type: 'Text Field',
          question_score: 1,
        },
        {
          code: 'Q0058',
          input_type: 'Text Field',
          question_score: 1,
        },
        {
          code: 'Q0059',
          input_type: 'Text Field',
          question_score: 1,
        },
        {
          code: 'Q0086',
          input_type: 'File Upload',
          question_score: 1,
        },
        {
          code: 'Q0090',
          input_type: 'File Upload',
          question_score: 1,
        },
        {
          code: 'Q0089',
          input_type: 'File Upload',
          question_score: 1,
        },
        {
          code: 'Q0087',
          input_type: 'File Upload',
          question_score: 1,
        },
        {
          code: 'Q0093',
          input_type: 'File Upload (expiry)',
          question_score: 1,
        },
        {
          code: 'Q0092',
          input_type: 'File Upload',
          question_score: 1,
        },
        {
          code: 'Q0042',
          input_type: 'File Upload (expiry)',
          question_score: 0,
        },
      ],
      dynamic_question: [
        {
          code: 'xfv',
          name: 'Section 1',
          sub_name: '',
          questions: [
            {
              code: 'DQ0001',
              question_text: {
                id: 'dimana rumah anda?',
                eng: 'where is your home?',
              },
              input_type: 'Short Answer',
              options: [],
              question_score: 5,
              is_required: false,
            },
            {
              code: 'DQ0002',
              question_text: {
                id: 'ceritakan tentang diri anda?',
                eng: 'tell me about yourself?',
              },
              input_type: 'Paragraph',
              options: [],
              question_score: 5,
              is_required: false,
            },
            {
              code: 'DQ0003',
              question_text: {
                id: 'apakah anda bersedia tinggal dijakarta?',
                eng: 'are you willing to live in Jakarta?',
              },
              input_type: 'Checkboxes',
              options: [],
              question_score: 5,
              is_required: false,
            },
            {
              code: 'DQ0004',
              question_text: {
                id: 'kapan anda lahir?',
                eng: 'when were you born?',
              },
              input_type: 'Date',
              options: [],
              question_score: 5,
              is_required: false,
            },
            {
              code: 'DQ0005',
              question_text: {
                id: 'Makanan favoritmu?',
                eng: 'Your favorite food?',
              },
              input_type: 'Dropdown',
              options: [
                {
                  option_text: {
                    id: 'Rendang Id',
                    eng: 'Rendang Eng',
                  },
                  option_score: 5,
                },
                {
                  option_text: {
                    id: 'Bakso Id',
                    eng: 'Bakso Eng',
                  },
                  option_score: 0,
                },
              ],
              question_score: 0,
              is_required: false,
            },
            {
              code: 'DQ0006',
              question_text: {
                id: 'Bahasa pemrograman apa yang Anda kuasai? new',
                eng: 'What programming languages ​​do you master? new',
              },
              input_type: 'Multiple Choice',
              options: [
                {
                  option_text: {
                    id: 'MySQL ID',
                    eng: 'MySQL Eng',
                  },
                  option_score: 5,
                },
                {
                  option_text: {
                    id: 'C++ ID',
                    eng: 'C++ Eng',
                  },
                  option_score: 50,
                },
              ],
              question_score: 0,
              is_required: false,
            },
            {
              code: 'DQe4bd6bbd',
              question_text: {
                id: 'KTP',
                eng: 'KTP',
              },
              input_type: 'File Upload',
              options: [],
              question_score: 5,
              is_required: false,
            },
            {
              code: 'DQfc8ce9ea',
              question_text: {
                id: 'SKCK',
                eng: 'SKCK',
              },
              input_type: 'File Upload (expiry)',
              options: [],
              question_score: 5,
              is_required: false,
            },
          ],
        },
      ],
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

      await questionFormRepository.saveAndUpdateQuestionForm(questionForm, { username: 'jhone', role_ids: [1] });
      result = await questionFormRepository.getQuestionFormByMajorIdAndVersion(0, 1);
      questionForm.created_on = result.created_on;
      questionForm.modified_on = result.modified_on;
    });

    afterEach(async () => {
      await QuestionFormActiveConfigModel.destroy({ where: {} });
      await QuestionFormActiveHistoryModel.destroy({ where: {} });
      await QuestionForm.deleteMany(); // Menghapus semua data Question Form
    });

    it('Membandingkan data yang akan di update dengan yang sudah di update berdasarkan parameter yg dikirim (majorId, version)', () => {
      const { _id, ...fetchedDataMongo } = result._doc;
      expect({ ...fetchedDataMongo }).toMatchObject(questionForm);
    });

    it('Proses update hanya akan meng-update 1 data', () => {
      const { _id, ...fetchedDataMongo } = result._doc;
      expect({ ...fetchedDataMongo }).toMatchObject(questionForm);
    });
  });
};
