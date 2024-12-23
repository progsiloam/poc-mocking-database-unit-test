import moment from 'moment';
import { SubmissionStatusDocument } from '../../app/constants/submissionStatusDocument.constant';
import { SubmissionHeaderAttributes } from '../../app/models/postgres/trx/submissionHeader.model';

export const getTwoNumberYear = () => {
  return new Date().getFullYear().toString().slice(-2);
};

export const seedingSubmissionHeaders: Omit<SubmissionHeaderAttributes, 'id'>[] = [
  {
    // id: 2,
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    is_release: false,
    modified_by: 'vendor_admin_0001',
    status: SubmissionStatusDocument['Awaiting Verification'],
    submission_number: `PQ-${getTwoNumberYear()}01-00001`,
    vendor_id: 1,
    vendor_name: 'PT NOMER 1',
    approved_on: new Date('2024-12-06T10:13:06.418Z'),
    approved_by: 'maxime1',
    completed_date: undefined,
    corrected_score_note: undefined,
    expired_at: undefined,
    note: '',
    score_collection: undefined,
    score_review: undefined,
    submitted_date: new Date('2024-01-02T22:32:47.572Z'),
  },
  {
    // id: 2,
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    is_release: false,
    modified_by: 'vendor_admin_0001',
    status: SubmissionStatusDocument.Unqualified,
    submission_number: `PQ-${getTwoNumberYear()}01-00001`,
    vendor_id: 1,
    vendor_name: 'PT NOMER 1',
    approved_on: new Date('2024-12-06T10:13:06.418Z'),
    approved_by: 'maxime1',
    completed_date: undefined,
    corrected_score_note: undefined,
    expired_at: undefined,
    note: 'Kurang Sesuai',
    score_collection: undefined,
    score_review: undefined,
    submitted_date: new Date('2024-01-02T22:32:47.572Z'),
  },
];
