export interface SaveDraftSubmissionData {
  submission_header_id: number;
}

export interface SubmissionListData {
  submission_header_id: number;
  submission_number: string;
  vendor_name: string;
  major_of_business: string;
  current_approver: string;
  status: number;
  created_by: string;
  submitted_date: Date | null;
  completed_date: Date | null;
}

export interface StartSubmissionTimelineData {
  id: number;
  start_at: Date;
  end_at: Date;
  created_by: string;
  created_on: Date;
}
