import { QueryTypes } from 'sequelize';
// import SequelizeMock from 'sequelize-mock';
import { connectToPostgres } from '../../app/models';
import { Submission } from '../../app/models/mongo/submission.model';
import { SubmissionDetailModel } from '../../app/models/postgres/trx/submissionDetail.model';
import { SubmissionHeaderModel } from '../../app/models/postgres/trx/submissionHeader.model';
import { SubmissionProcessReviewModel } from '../../app/models/postgres/trx/submissionProcessReview.model';
import { SubmissionHeaderQuery } from '../../app/queries/postgres/trx/submissionHeader.query';
import { ReportSubmissionRepository } from '../../app/repositories/reportSubmission.repository';
import { ListReportSubmissionData } from '../../app/types/reportSubmission/reportSubmissionData.type';
import { seedingSubmissionDetails, seedingSubmissionDetails2 } from './seedingDetailSubmission';
import { seedingSubmissionHeaders } from './seedingHeaderSubmission';
import { seedingSubmissoinProcessReview1, seedingSubmissoinProcessReview2 } from './seedingSubmissionProcessReview';
import { seedingSubmissions } from './seedingSubmissions';

// Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #1

// const dbMock = new SequelizeMock();
// dbMock.query = jest.fn((query, options) => {
//   const { username, startDate, endDate } = options.replacements;
//   if (query.includes('SELECT * FROM trx.report_action_history_preq')) {
//     if (username === 'maxime1') {
//       return Promise.resolve([
//         {
//           id: 1,
//           submission_number: 'PQ-2401-00001',
//           vendor_name: 'PT NOMER 1',
//           status: 1,
//           approved_on: 'DOCUMENT COLLECTION',
//           created_by: 'vendor_admin_0001',
//           approved_by: 'maxime1',
//         },
//         {
//           id: 2,
//           submission_number: 'PQ-2401-00001',
//           vendor_name: 'PT NOMER 1',
//           status: 5,
//           approved_on: 'DOCUMENT COLLECTION',
//           created_by: 'vendor_admin_0001',
//           approved_by: 'maxime1',
//         },
//         {
//           id: 1,
//           submission_number: 'PQ-2401-00001',
//           vendor_name: 'PT NOMER 1',
//           status: 1,
//           approved_on: 'DOCUMENT REVIEW',
//           created_by: 'vendor_admin_0001',
//           approved_by: 'maxime1',
//         },
//       ]);
//     } else {
//       return Promise.resolve([
//         {
//           id: 4,
//           submission_number: 'PQ-2401-00001',
//           vendor_name: 'PT NOMER 1',
//           status: 5,
//           approved_on: 'DOCUMENT REVIEW',
//           created_by: 'vendor_admin_0001',
//           approved_by: 'maxime2',
//         },
//       ]);
//     }
//     return Promise.resolve([]); // Return empty if no match
//   }
//   return Promise.reject(new Error('Query not mocked!'));
// });

export const getReportActionHistory = () => {
  describe('Mengembalikan Report Document Pre-Qualification.', () => {
    let reportSubmissionRepository: ReportSubmissionRepository;
    let submissionHeaders: SubmissionHeaderModel[];

    beforeAll(async () => {
      reportSubmissionRepository = new ReportSubmissionRepository(new SubmissionHeaderQuery());
    });

    beforeEach(async () => {
      submissionHeaders = await SubmissionHeaderModel.bulkCreate(seedingSubmissionHeaders);

      const seeding_submission_detail = seedingSubmissionDetails.map((detail) => {
        return {
          created_by: detail.created_by,
          created_on: detail.created_on,
          major_id: detail.major_id,
          modified_on: detail.modified_on,
          modified_by: detail.modified_by,
          mongo_submission_id: detail.mongo_submission_id,
          name: detail.name,
          submission_header_id: submissionHeaders[0].id,
          system_score: detail.system_score,
          corrected_score: detail.corrected_score,
          weight_score: detail.weight_score,
        };
      });
      await SubmissionDetailModel.bulkCreate(seeding_submission_detail);

      const seeding_submission_detail2 = seedingSubmissionDetails2.map((detail) => {
        return {
          created_by: detail.created_by,
          created_on: detail.created_on,
          major_id: detail.major_id,
          modified_on: detail.modified_on,
          modified_by: detail.modified_by,
          mongo_submission_id: detail.mongo_submission_id,
          name: detail.name,
          submission_header_id: submissionHeaders[1].id,
          system_score: detail.system_score,
          corrected_score: detail.corrected_score,
          weight_score: detail.weight_score,
        };
      });
      await SubmissionDetailModel.bulkCreate(seeding_submission_detail2);

      seedingSubmissoinProcessReview1.submission_header_id = submissionHeaders[0].id;
      await SubmissionProcessReviewModel.create(seedingSubmissoinProcessReview1);

      seedingSubmissoinProcessReview2.submission_header_id = submissionHeaders[1].id;
      await SubmissionProcessReviewModel.create(seedingSubmissoinProcessReview2);
      await Submission.insertMany(seedingSubmissions);

      // Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #2

      jest.spyOn(ReportSubmissionRepository.prototype, 'getReportActionHistory').mockImplementation(async (username, startDate, endDate) => {
        const results: ListReportSubmissionData[] = [];
        const query1: ListReportSubmissionData[] = await connectToPostgres.query(
          `SELECT sh.id, sh.submission_number, sh.vendor_name, sh.status, 'DOCUMENT COLLECTION'::VARCHAR AS approved_on,
              sh.submitted_date, sh.created_by, sh.approved_by
       FROM trx.submission_header sh
       WHERE sh.approved_by = :username AND sh.approved_on BETWEEN :startDate AND :endDate`,
          {
            replacements: { username, startDate, endDate },
            type: QueryTypes.SELECT,
          },
        );
        results.push(...query1);

        const query2: ListReportSubmissionData[] = await connectToPostgres.query(
          `SELECT sh.id, sh.submission_number, sh.vendor_name, sh.status, 'DOCUMENT REVIEW' AS approved_on,
          sh.submitted_date, sh.created_by, spr.submission_header_id, spr.username AS approved_by, spr.created_on AS reviewed_date
          FROM trx.submission_header sh
          JOIN trx.submission_process_review spr ON sh.id = spr.submission_header_id
                 WHERE spr.username = :username AND spr.created_on BETWEEN :startDate AND :endDate`,
          {
            replacements: { username, startDate, endDate },
            type: QueryTypes.SELECT,
          },
        );
        results.push(...query2);

        return results;
      });
    });

    afterEach(async () => {
      await SubmissionHeaderModel.destroy({ where: {} });
      await SubmissionDetailModel.destroy({ where: {} });
      await SubmissionProcessReviewModel.destroy({ where: {} });
      await Submission.deleteMany({});
    });

    it('Mengembalikan Report Document Pre-Qualification berdasarkan parameter (username, startDate, endDate) - [Case 1] userLogin sebagai approver', async () => {
      // Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #1
      // const reportSubmission = await dbMock.query(`SELECT * FROM trx.report_action_history_preq(:username, :startDate, :endDate)`, {
      //   replacements: {
      //     username: 'maxime1',
      //     startDate: new Date('2024-12-06T10:13:06.418Z'),
      //     endDate: new Date('2025-01-01T00:00:00.000Z'),
      //   },
      //   type: QueryTypes.SELECT,
      // });

      // Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #2
      const reportSubmission = await reportSubmissionRepository.getReportActionHistory(
        'maxime1',
        new Date('2024-12-06T10:13:06.418Z'),
        new Date('2025-01-01T00:00:00.000Z'),
      );
      const result = reportSubmission.map((result) => {
        return {
          id: result.id,
          submission_number: result.submission_number,
          vendor_name: result.vendor_name,
          status: result.status,
          approved_on: result.approved_on,
          created_by: result.created_by,
          approved_by: result.approved_by,
        };
      });
      const expected = [
        {
          id: result[0].id,
          submission_number: 'PQ-2401-00001',
          vendor_name: 'PT NOMER 1',
          status: 1,
          approved_on: 'DOCUMENT COLLECTION',
          created_by: 'vendor_admin_0001',
          approved_by: 'maxime1',
        },
        {
          id: result[1].id,
          submission_number: 'PQ-2401-00001',
          vendor_name: 'PT NOMER 1',
          status: 5,
          approved_on: 'DOCUMENT COLLECTION',
          created_by: 'vendor_admin_0001',
          approved_by: 'maxime1',
        },
        {
          id: result[2].id,
          submission_number: 'PQ-2401-00001',
          vendor_name: 'PT NOMER 1',
          status: 1,
          approved_on: 'DOCUMENT REVIEW',
          created_by: 'vendor_admin_0001',
          approved_by: 'maxime1',
        },
      ];
      expect(result.length).toBe(3);
      expect(expected).toEqual(result);
    });

    it('Mengembalikan Report Document Pre-Qualification berdasarkan parameter (username, startDate, endDate) - [Case 2] userLogin sebagai reviewer dan bukan approver', async () => {
      // Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #1
      // const reportSubmission = await dbMock.query(`SELECT * FROM trx.report_action_history_preq(:username, :startDate, :endDate)`, {
      //   replacements: {
      //     username: 'maxime2',
      //     startDate: new Date('2024-12-06T10:13:06.418Z'),
      //     endDate: new Date('2025-01-01T00:00:00.000Z'),
      //   },
      //   type: QueryTypes.SELECT,
      // });

      // Cara Mocking Database Dengan Query Yang Memiliki Store Procedure #2
      const reportSubmission = await reportSubmissionRepository.getReportActionHistory(
        'maxime2',
        new Date('2024-12-06T10:13:06.418Z'),
        new Date('2025-01-01T00:00:00.000Z'),
      );

      const result = reportSubmission.map((result) => {
        return {
          id: result.id,
          submission_number: result.submission_number,
          vendor_name: result.vendor_name,
          status: result.status,
          approved_on: result.approved_on,
          created_by: result.created_by,
          approved_by: result.approved_by,
        };
      });

      const expected = [
        {
          id: result[0].id,
          submission_number: 'PQ-2401-00001',
          vendor_name: 'PT NOMER 1',
          status: 5,
          approved_on: 'DOCUMENT REVIEW',
          created_by: 'vendor_admin_0001',
          approved_by: 'maxime2',
        },
      ];

      expect(result.length).toBe(1);
      expect(expected).toEqual(result);
    });
  });
};
