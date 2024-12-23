import { ApiResponse } from '@siloamhospitals/erp-template-expressjs-library';
import express from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Body, Controller, Get, Middlewares, Path, Post, Request, Route, Tags } from 'tsoa';
import { Roles } from '../constants/roles.constant';
import { checkAuth, requireRoles } from '../middlewares/auth.middleware';
import type { QuestionFormRepository } from '../repositories/questionForm.repository';
import type { QuestionFormMaster } from '../types/commonMaster.type';
import type { ListQuestionFormData, QuestionFormSetNewVersionData } from '../types/questionForm/questionFormData.type';
import type { QuestionFormParams, QuestionFormSetActiveVersion } from '../types/questionForm/questionFormParams.type';

@Tags('Question Form')
@Route('question-form')
@provide(QuestionFormController)
@Middlewares(checkAuth())
export class QuestionFormController extends Controller {
  constructor(@inject('QuestionFormRepository') private readonly questionFormRepository: QuestionFormRepository) {
    super();
  }

  @Get('/all')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async getAllQuestionnaires(@Request() req: express.Request): Promise<ApiResponse<ListQuestionFormData[]>> {
    return ApiResponse.success<ListQuestionFormData[]>(await this.questionFormRepository.getAllQuestionFormsActive(req));
  }

  @Get('/major/{majorId}/version/{version}')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async getQuestionnaireByMajorIdAndVersion(@Path() majorId: number, @Path() version: number): Promise<ApiResponse<QuestionFormMaster>> {
    return ApiResponse.success<QuestionFormMaster>(await this.questionFormRepository.getQuestionFormByMajorIdAndVersion(majorId, version));
  }

  @Get('/{majorId}/version-options')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async getVersionOptionByMajorId(@Path() majorId: number): Promise<ApiResponse<number[]>> {
    return ApiResponse.success<number[]>(await this.questionFormRepository.getVersionOptionByMajorId(majorId));
  }

  @Get('/{majorId}/get-active-questionnaire')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport, Roles.VendorAdmin, Roles.SiloamPreQRequester]))
  public async getQuestionnaireActiveByMajorId(@Path() majorId: number): Promise<ApiResponse<QuestionFormMaster>> {
    return ApiResponse.success<QuestionFormMaster>(await this.questionFormRepository.getQuestionFormActiveByMajorId(majorId));
  }

  @Get('/{majorId}/version-active/{version}')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async checkQuestionnaireActiveVersion(@Path() majorId: number, @Path() version: number): Promise<ApiResponse<boolean>> {
    return ApiResponse.success<boolean>(await this.questionFormRepository.checkQuestionFormActiveVersion(majorId, version));
  }

  @Post('/save')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async saveAndUpdateQuestionnaire(@Body() param: QuestionFormParams, @Request() req: express.Request): Promise<ApiResponse> {
    await this.questionFormRepository.saveAndUpdateQuestionForm(param, req.user!);
    return ApiResponse.success();
  }

  @Post('/create-new-version/{majorId}')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async setNewVersionQuestionnaire(
    @Path() majorId: number,
    @Request() req: express.Request,
  ): Promise<ApiResponse<QuestionFormSetNewVersionData>> {
    return ApiResponse.success<QuestionFormSetNewVersionData>(await this.questionFormRepository.setNewVersionQuestionForm(majorId, req.user!));
  }

  @Post('/set-active')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async setQuestionnaireActiveVersion(@Body() param: QuestionFormSetActiveVersion, @Request() req: express.Request): Promise<ApiResponse> {
    await this.questionFormRepository.setQuestionFormActiveVersion(param, req.user!);
    return ApiResponse.success();
  }
}
