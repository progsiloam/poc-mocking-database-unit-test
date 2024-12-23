import type { Submissions } from '../common.type';

export interface SubmissionParams {
  submission_header_id?: number;
  vendor_id: number;
  data: Submissions[];
}

export interface StartSubmissionTimelineParams {
  start_at: Date;
  end_at: Date;
}
