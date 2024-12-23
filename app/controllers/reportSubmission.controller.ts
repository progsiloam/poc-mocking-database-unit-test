import { ApiResponse } from '@siloamhospitals/erp-template-expressjs-library';
import express from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Controller, Get, Middlewares, Query, Request, Route, Tags } from 'tsoa';
import { Roles } from '../constants/roles.constant';
import { checkAuth, requireRoles } from '../middlewares/auth.middleware';
import type { ReportSubmissionRepository } from '../repositories/reportSubmission.repository';
import type { ListReportSubmissionData } from '../types/reportSubmission/reportSubmissionData.type';

@Tags('Report Action Submission')
@Route('report-action')
@provide(ReportSubmissionController)
@Middlewares(checkAuth())
export class ReportSubmissionController extends Controller {
  constructor(@inject('ReportSubmissionRepository') private readonly reportSubmissionRepository: ReportSubmissionRepository) {
    super();
  }

  @Get('/report-action-history')
  @Middlewares(requireRoles([Roles.SiloamPreQScorer, Roles.SiloamVendorManagement]))
  public async getReportActionHistory(
    @Query() startDate: Date,
    @Query() endDate: Date,
    @Request() req: express.Request,
  ): Promise<ApiResponse<ListReportSubmissionData[]>> {
    const { username } = req.user!;
    return ApiResponse.success<ListReportSubmissionData[]>(
      await this.reportSubmissionRepository.getReportActionHistory(username, startDate, endDate),
    );
  }
}
