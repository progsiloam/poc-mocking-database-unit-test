import { ApiResponse } from '@siloamhospitals/erp-template-expressjs-library';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { Body, Controller, Get, Middlewares, Path, Post, Route, Tags } from 'tsoa';
import { Roles } from '../constants/roles.constant';
import { checkAuth, requireRoles } from '../middlewares/auth.middleware';
import type { QuestionMasterRepository } from '../repositories/questionMaster.repository';
import type { Questions } from '../types/commonMaster.type';
import type { QuestionMasterParams } from '../types/questionMaster/questionMasterParams.type';

@Tags('Question Master')
@Route('question-master')
@provide(QuestionMasterController)
@Middlewares(checkAuth())
export class QuestionMasterController extends Controller {
  constructor(@inject('QuestionMasterRepository') private readonly questionMasterRepository: QuestionMasterRepository) {
    super();
  }

  @Get('/all')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async getAllQuestions(): Promise<ApiResponse<Questions[]>> {
    return ApiResponse.success<Questions[]>(await this.questionMasterRepository.getAllQuestions());
  }

  @Get('/{questionId}')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async getQuestionById(@Path() questionId: string): Promise<ApiResponse<Questions>> {
    return ApiResponse.success<Questions>(await this.questionMasterRepository.getQuestionById(questionId));
  }

  @Post('/save')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async saveAndUpdateQuestion(@Body() param: QuestionMasterParams): Promise<ApiResponse> {
    await this.questionMasterRepository.saveAndUpdateQuestion(param);
    return ApiResponse.success();
  }

  @Post('/{questionId}/delete')
  @Middlewares(requireRoles([Roles.SiloamITProductSupport]))
  public async deleteQuestion(@Path() questionId: string): Promise<ApiResponse> {
    await this.questionMasterRepository.deleteQuestion(questionId);
    return ApiResponse.success();
  }
}
