import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import type { SubmissionHeaderQuery } from '../queries/postgres/trx/submissionHeader.query';
import type { ListReportSubmissionData } from '../types/reportSubmission/reportSubmissionData.type';

@provide('ReportSubmissionRepository')
export class ReportSubmissionRepository {
  constructor(@inject('SubmissionHeaderQuery') private readonly submissionHeaderQuery: SubmissionHeaderQuery) {}

  public async getReportActionHistory(username: string, startDate: Date, endDate: Date): Promise<ListReportSubmissionData[]> {
    return this.submissionHeaderQuery.getReportActionHistory(username, startDate, endDate);
  }
}
