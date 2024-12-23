import { provide } from 'inversify-binding-decorators';
import type { ClientSession, SortOrder } from 'mongoose';
import { QuestionMaster, type QuestionMasterDocument } from '../../models/mongo/questionMaster.model';
import type { QuestionMasterParams } from '../../types/questionMaster/questionMasterParams.type';

@provide('QuestionMasterQuery')
export class QuestionMasterQuery {
  public async getAllQuestion<Property extends QuestionMasterDocument>(
    order?: { [key in keyof Property]?: SortOrder },
    session?: ClientSession,
  ): Promise<QuestionMasterDocument[]> {
    return await QuestionMaster.find({}, null, { session })
      .sort(order as { [key: string]: SortOrder })
      .select('-__v');
  }

  public async getQuestionById(questionId: string, session?: ClientSession): Promise<QuestionMasterDocument> {
    return await QuestionMaster.findOne({ _id: questionId }, null, { session }).select('-__v');
  }

  public async saveQuestion(param: QuestionMasterParams, session?: ClientSession) {
    await QuestionMaster.create([param], null, { session });
  }

  public async updateQuestion(param: QuestionMasterParams, session?: ClientSession) {
    await QuestionMaster.updateOne({ _id: param._id }, param, { session });
  }

  public async deleteQuestion(questionId: string, session?: ClientSession) {
    await QuestionMaster.deleteOne({ _id: questionId }, { session });
  }
}
