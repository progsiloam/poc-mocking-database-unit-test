import { SubmissionStatusDocument } from '../../../constants/submissionStatusDocument.constant';
import { SubmissionHeaderAttributes } from '../../../models/postgres/trx/submissionHeader.model';

export interface PreQVendorList {
  id: number;
  vendorName: string;
  majorOfBusiness: string;
  preQStatus: SubmissionStatusDocument;
  createdBy: string;
  validUntil: Date;
  scoreDocumentCollection: number;
  scoreDocumentReview: number;
}

export interface AvailableReleaseMajorOptions {
  value: number;
  label: string;
}

export interface AvailableReleaseMajorOptions {
  value: number;
  label: string;
}

export interface SubmissionHeaderData
  extends Pick<
    SubmissionHeaderAttributes,
    | 'id'
    | 'submission_number'
    | 'vendor_id'
    | 'status'
    | 'submitted_date'
    | 'completed_date'
    | 'expired_at'
    | 'is_release'
    | 'approved_by'
    | 'approved_on'
    | 'corrected_score_note'
    | 'created_by'
    | 'note'
    | 'vendor_name'
    | 'score_collection'
    | 'score_review'
  > {}
