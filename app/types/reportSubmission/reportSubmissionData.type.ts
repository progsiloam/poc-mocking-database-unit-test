export interface ListReportSubmissionData {
  id: number;
  submission_number: string;
  vendor_name: string;
  status: number;
  approved_by: string;
  approved_on: Date;
  created_date: Date;
  created_by: string;
  submitted_date: Date;
  reviewed_date: Date;
}
