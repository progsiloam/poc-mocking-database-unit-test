import { provide } from 'inversify-binding-decorators';
import type { Transaction } from 'sequelize';
import { QuestionFormActiveConfigModel, type QuestionFormActiveConfigAttributes } from '../../../models/postgres/cfg/questionFormActiveConfig.model';

@provide('QuestionFormActiveConfigQuery')
export class QuestionFormActiveConfigQuery {
  public async getQuestionFormActiveVersion<Property extends keyof QuestionFormActiveConfigAttributes>(
    majorId: number,
    attributes?: Property[],
    tran?: Transaction,
  ): Promise<QuestionFormActiveConfigAttributes | null> {
    return await QuestionFormActiveConfigModel.findOne({ where: { major_id: majorId }, attributes, transaction: tran });
  }

  public async getAllQuestionFormActiveVersion<Property extends keyof QuestionFormActiveConfigAttributes>(
    attributes?: Property[],
    tran?: Transaction,
  ): Promise<QuestionFormActiveConfigAttributes[]> {
    return await QuestionFormActiveConfigModel.findAll({ attributes, transaction: tran });
  }

  public async getQuestionFormActiveVersionByMajorIdAndVersion(
    majorId: number,
    version: number,
    tran?: Transaction,
  ): Promise<QuestionFormActiveConfigAttributes | null> {
    return await QuestionFormActiveConfigModel.findOne({ where: { major_id: majorId, version: version }, transaction: tran });
  }

  public async saveQuestionFormActiveVersion(param: Omit<QuestionFormActiveConfigAttributes, 'id'>, tran?: Transaction) {
    await QuestionFormActiveConfigModel.create(param, { transaction: tran });
  }

  public async updateQuestionFormActiveVersion(param: QuestionFormActiveConfigAttributes, tran?: Transaction) {
    await QuestionFormActiveConfigModel.update(param, { where: { id: param.id }, transaction: tran });
  }

  public async deleteQuestionFormActiveVersion(majorId: number, tran?: Transaction) {
    await QuestionFormActiveConfigModel.destroy({ where: { major_id: majorId }, transaction: tran });
  }
}
