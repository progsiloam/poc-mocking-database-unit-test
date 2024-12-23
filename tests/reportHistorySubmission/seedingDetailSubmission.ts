import moment from 'moment';
import { SubmissionDetailAttributes } from '../../app/models/postgres/trx/submissionDetail.model';

const DOC_1: Omit<SubmissionDetailAttributes, 'id'>[] = [
  {
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 0,
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    modified_by: 'vendor_admin_0001',
    mongo_submission_id: `675149f6094164000c7569ef`,
    name: 'General',
    submission_header_id: 0,
    system_score: 8,
    corrected_score: undefined,
    weight_score: 50,
  },
  {
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 3,
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    modified_by: 'vendor_admin_0001',
    mongo_submission_id: `67514a0de52ff7000cc33fa7`,
    name: 'FACILITY MAINTENANCE & SERVICES',
    submission_header_id: 0,
    system_score: 90,
    corrected_score: undefined,
    weight_score: 50,
  },
];

const DOC_2: Omit<SubmissionDetailAttributes, 'id'>[] = [
  {
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 0,
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    modified_by: 'vendor_admin_0001',
    mongo_submission_id: `648d1f3e5d8eac3b5c4e1234`,
    name: 'General',
    submission_header_id: 1,
    system_score: 8,
    corrected_score: undefined,
    weight_score: 50,
  },
  {
    created_by: 'vendor_admin_0001',
    created_on: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 5,
    modified_on: moment().set('month', 0).set('date', 2).toDate(),
    modified_by: 'vendor_admin_0001',
    mongo_submission_id: `648d1f3e5d8eac3b5c4e5678`,
    name: 'INFORMATION & COMMUNICATION TECHNOLOGY',
    submission_header_id: 1,
    system_score: 90,
    corrected_score: undefined,
    weight_score: 50,
  },
];

export const seedingSubmissionDetails: Omit<SubmissionDetailAttributes, 'id'>[] = [
  //
  ...DOC_1,
];

export const seedingSubmissionDetails2: Omit<SubmissionDetailAttributes, 'id'>[] = [
  //
  ...DOC_2,
];
