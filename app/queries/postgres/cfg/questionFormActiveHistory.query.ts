import { provide } from 'inversify-binding-decorators';
import type { Transaction } from 'sequelize';
import {
  type QuestionFormActiveHistoryAttributes,
  QuestionFormActiveHistoryModel,
} from '../../../models/postgres/cfg/questionFormActiveHistory.model';

@provide('QuestionFormActiveHistoryQuery')
export class QuestionFormActiveHistoryQuery {
  public async getAllQuestionFormActiveHistoryByMajorId<Property extends keyof QuestionFormActiveHistoryAttributes>(
    majorId: number,
    attributes?: Property[],
    order?: [Property, 'ASC' | 'DESC'][],
    tran?: Transaction,
  ): Promise<QuestionFormActiveHistoryAttributes[]> {
    return await QuestionFormActiveHistoryModel.findAll({ where: { major_id: majorId }, attributes, order, transaction: tran });
  }

  public async saveQuestionFormActiveHistory(
    param: Pick<
      QuestionFormActiveHistoryAttributes,
      'major_id' | 'version_from' | 'version_to' | 'created_by' | 'created_on' | 'total_question_from' | 'total_question_to'
    >,
    tran?: Transaction,
  ) {
    await QuestionFormActiveHistoryModel.create(param, { transaction: tran });
  }
}
