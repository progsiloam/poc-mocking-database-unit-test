import { provide } from 'inversify-binding-decorators';
import type { ClientSession, SortOrder } from 'mongoose';
import { QuestionForm, type QuestionFormDocument } from '../../models/mongo/questionForm.model';
import type { QuestionFormActiveConfigAttributes } from '../../models/postgres/cfg/questionFormActiveConfig.model';
import type { QuestionFormParams } from '../../types/questionForm/questionFormParams.type';

@provide('QuestionFormQuery')
export class QuestionFormQuery {
  public async getAllQuestionForms<Property extends QuestionFormActiveConfigAttributes>(
    attributes?: Pick<Property, 'version' | 'major_id'>[],
    order?: { [key in keyof Property]?: SortOrder },
    session?: ClientSession,
  ): Promise<QuestionFormDocument[]> {
    return await QuestionForm.find(
      {
        $or: attributes?.map((attr) => ({ major_id: attr.major_id, version: attr.version })),
      },
      null,
      { session },
    )
      .sort(order as { [key: string]: SortOrder })
      .select('-__v');
  }

  public async getAllQuestionFormByMajorId(majorId: number, session?: ClientSession): Promise<QuestionFormDocument[]> {
    return await QuestionForm.find({ major_id: majorId }, null, { session }).select('-__v');
  }

  public async getQuestionFormByMajorId<Property extends QuestionFormDocument>(
    majorId: number,
    order?: { [key in keyof Property]?: SortOrder },
    session?: ClientSession,
  ): Promise<QuestionFormDocument> {
    return await QuestionForm.findOne({ major_id: majorId }, null, { session })
      .sort(order as { [key: string]: SortOrder })
      .select('-__v');
  }

  public async getQuestionFormByMajorIdAndVersion(majorId: number, version: number, session?: ClientSession): Promise<QuestionFormDocument> {
    return await QuestionForm.findOne({ major_id: majorId, version }, null, { session }).select('-__v');
  }

  public async getQuestionFormVersionOptions(majorId: number, session?: ClientSession): Promise<number[]> {
    return await QuestionForm.find({ major_id: majorId }, null, { session }).select('version').distinct('version');
  }

  public async saveAndUpdateQuestionForm(param: QuestionFormParams, session?: ClientSession) {
    await QuestionForm.findOneAndUpdate(
      { major_id: param.major_id, version: param.version },
      { $set: param },
      {
        new: true,
        runValidators: true,
        upsert: true,
        session,
      },
    );
  }
}
