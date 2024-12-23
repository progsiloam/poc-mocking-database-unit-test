import { WorkflowGroupType } from '../../app/constants/workflowGroup.constant';
import { SubmissionProcessReviewAttributes } from '../../app/models/postgres/trx/submissionProcessReview.model';

export const seedingSubmissoinProcessReview1: Omit<SubmissionProcessReviewAttributes, 'id'> = {
  submission_header_id: 0,
  group: WorkflowGroupType.VendorManagement,
  score: 100,
  username: 'maxime1',
  note: 'Oke baik',
  created_by: 'maxime1',
  created_on: new Date('2024-12-06T10:13:06.418Z'),
};

export const seedingSubmissoinProcessReview2: Omit<SubmissionProcessReviewAttributes, 'id'> = {
  submission_header_id: 0,
  group: WorkflowGroupType.SME,
  score: 100,
  username: 'maxime2',
  note: 'Oke baik',
  created_by: 'maxime2',
  created_on: new Date('2024-12-06T10:13:06.418Z'),
};
