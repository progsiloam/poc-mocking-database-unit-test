export interface SubmissionDetail {
  id: number;
  major_id: number;
  submission_header_id: number;
  name: string;
  system_score: number;
  corrected_score?: number;
  weight_score?: number;
}

export interface SubmissionProcessReview {
  id: number;
  group: number;
  score: number;
  note?: string;
}

export interface SubmissionDetailData {
  details: SubmissionDetail[];
  process_review: SubmissionProcessReview[];
}
