import { ShgError } from '@siloamhospitals/erp-template-expressjs-library';
import express from 'express';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import { connectToPostgres } from '../models';
import type { QuestionFormQuery } from '../queries/mongo/questionForm.query';
import type { QuestionFormActiveConfigQuery } from '../queries/postgres/cfg/questionFormActiveConfig.query';
import type { QuestionFormActiveHistoryQuery } from '../queries/postgres/cfg/questionFormActiveHistory.query';
import type { VobService } from '../services/vob.service';
import type { UserData } from '../types/auth.type';
import type { QuestionFormMaster } from '../types/commonMaster.type';
import type { ListQuestionFormData, QuestionFormSetNewVersionData } from '../types/questionForm/questionFormData.type';
import type { QuestionFormParams, QuestionFormSetActiveVersion } from '../types/questionForm/questionFormParams.type';

@provide('QuestionFormRepository')
export class QuestionFormRepository {
  constructor(
    @inject('QuestionFormQuery') private readonly questionFormQuery: QuestionFormQuery,
    @inject('QuestionFormActiveConfigQuery') private readonly questionFormActiveConfigQuery: QuestionFormActiveConfigQuery,
    @inject('QuestionFormActiveHistoryQuery') private readonly questionFormActiveHistoryQuery: QuestionFormActiveHistoryQuery,
    @inject('VobService') private readonly vobService: VobService,
  ) {}

  public async getAllQuestionFormsActive(req: express.Request): Promise<ListQuestionFormData[]> {
    const questionFormActive = await this.questionFormActiveConfigQuery.getAllQuestionFormActiveVersion(['major_id', 'version']);
    const questionForms = await this.questionFormQuery.getAllQuestionForms(questionFormActive, { major_id: -1 });
    if (questionForms.length === 0) {
      throw new ShgError('Question Forms not found');
    }

    // Getting Major Of Business at Vob
    const majorOfBusinessOptions = await this.vobService.getMajorOfBusinessOptions(req);

    const listQuestionFormData: ListQuestionFormData[] = await Promise.all(
      questionForms.map(async (questionForm) => {
        const questionFormActive = await this.questionFormActiveConfigQuery.getQuestionFormActiveVersion(questionForm.major_id, [
          'version',
          'total_question',
        ]);
        const majorName =
          questionForm.major_id !== 0 ? majorOfBusinessOptions.data!.find((major) => major.value === questionForm.major_id)!.label : 'General';

        return {
          _id: questionForm._id as string,
          major_id: questionForm.major_id,
          major_name: majorName,
          total_question: questionFormActive!.total_question,
          version: questionFormActive ? questionFormActive.version : 1,
          updated_at: questionForm.modified_on,
          updated_by: questionForm.modified_by,
        };
      }),
    );

    return listQuestionFormData.sort((a, b) => a.major_id - b.major_id);
  }

  public async getQuestionFormByMajorIdAndVersion(majorId: number, version: number): Promise<QuestionFormMaster> {
    const questionForm = await this.questionFormQuery.getQuestionFormByMajorIdAndVersion(majorId, version);
    if (questionForm === null) {
      throw new ShgError('Question Form not found');
    }
    return questionForm;
  }

  public async getVersionOptionByMajorId(majorId: number): Promise<number[]> {
    const versionOptions = await this.questionFormQuery.getQuestionFormVersionOptions(majorId);
    if (versionOptions.length === 0) {
      throw new ShgError('Question Form not found');
    }

    return versionOptions;
  }

  public async getQuestionFormActiveByMajorId(majorId: number): Promise<QuestionFormMaster> {
    const questionFormActiveConfig = await this.questionFormActiveConfigQuery.getQuestionFormActiveVersion(majorId, ['version']);
    if (questionFormActiveConfig === null) {
      throw new ShgError('Question Form Active Config not found');
    }

    const questionForm = await this.questionFormQuery.getQuestionFormByMajorIdAndVersion(majorId, questionFormActiveConfig.version);
    if (questionForm === null) {
      throw new ShgError('Question Form not found');
    }

    return questionForm;
  }

  public async checkQuestionFormActiveVersion(majorId: number, version: number): Promise<boolean> {
    const questionFormActiveConfig = await this.questionFormActiveConfigQuery.getQuestionFormActiveVersionByMajorIdAndVersion(majorId, version);
    return !!questionFormActiveConfig;
  }

  public async saveAndUpdateQuestionForm(param: QuestionFormParams, userLogin: UserData) {
    const data: QuestionFormMaster = {
      ...param,
      created_by: userLogin.username,
      created_on: new Date(),
      modified_by: userLogin.username,
      modified_on: new Date(),
    };
    await this.questionFormQuery.saveAndUpdateQuestionForm(data);
  }

  public async setNewVersionQuestionForm(majorId: number, userLogin: UserData): Promise<QuestionFormSetNewVersionData> {
    const questionForm = await this.questionFormQuery.getQuestionFormByMajorId(majorId, { created_on: -1 });
    const { version, static_question, dynamic_question, major_id } = questionForm;

    const data = {
      major_id,
      static_question,
      dynamic_question,
      version: questionForm === null ? 1 : version + 1,
      created_by: userLogin.username,
      created_on: new Date(),
      modified_by: userLogin.username,
      modified_on: new Date(),
    };
    await this.questionFormQuery.saveAndUpdateQuestionForm(data);
    return {
      major_id: majorId,
      version: data.version,
    };
  }

  public async setQuestionFormActiveVersion(param: QuestionFormSetActiveVersion, userLogin: UserData) {
    const tran = await connectToPostgres.transaction();

    try {
      const getQuestionFormActive = await this.questionFormActiveConfigQuery.getQuestionFormActiveVersion(
        param.major_id,
        ['version', 'total_question', 'id', 'major_id', 'created_by', 'created_on'],
        tran,
      );

      let totalQuestionOld: number = 0;
      let totalQuestionNew: number = 0;

      if (getQuestionFormActive) {
        const questionFormOld = await this.questionFormQuery.getQuestionFormByMajorIdAndVersion(param.major_id, getQuestionFormActive.version);
        const totalQuestionDynamicOld = questionFormOld.dynamic_question.reduce((acc, section) => acc + section.questions.length, 0);
        const totalQuestionStaticOld = questionFormOld.static_question.length;

        await this.questionFormActiveConfigQuery.updateQuestionFormActiveVersion(
          {
            id: getQuestionFormActive.id,
            major_id: param.major_id,
            total_question: totalQuestionNew,
            version: param.version,
            created_by: getQuestionFormActive.created_by,
            created_on: getQuestionFormActive.created_on,
            modified_by: userLogin.username,
            modified_on: new Date(),
          },
          tran,
        );

        totalQuestionOld = totalQuestionStaticOld + totalQuestionDynamicOld;
      } else {
        const questionFormNew = await this.questionFormQuery.getQuestionFormByMajorIdAndVersion(param.major_id, param.version);
        const totalQuestionDynamicNew = questionFormNew.dynamic_question.reduce((acc, section) => acc + section.questions.length, 0);
        const totalQuestionStaticNew = questionFormNew.static_question.length;

        await this.questionFormActiveConfigQuery.saveQuestionFormActiveVersion(
          {
            ...param,
            total_question: totalQuestionNew,
            created_by: userLogin.username,
            created_on: new Date(),
            modified_by: userLogin.username,
            modified_on: new Date(),
          },
          tran,
        );

        totalQuestionNew = totalQuestionStaticNew + totalQuestionDynamicNew;
      }

      const questionFormActiveHistory = {
        major_id: param.major_id,
        version_from: getQuestionFormActive?.version,
        version_to: param.version,
        total_question_from: totalQuestionOld,
        total_question_to: totalQuestionNew,
        created_by: userLogin.username,
        created_on: new Date(),
      };

      await this.questionFormActiveHistoryQuery.saveQuestionFormActiveHistory(questionFormActiveHistory, tran);

      await tran.commit();
    } catch (error) {
      await tran.rollback();
      throw error;
    }
  }
}
