import { provide } from 'inversify-binding-decorators';
import type { Transaction } from 'sequelize';
import { Op, QueryTypes } from 'sequelize';
import { SubmissionStatusDocument } from '../../../constants/submissionStatusDocument.constant';
import { connectToPostgres } from '../../../models';
import { SubmissionHeaderModel, type SubmissionHeaderAttributes } from '../../../models/postgres/trx/submissionHeader.model';
import { UserData, WhereClause } from '../../../types/auth.type';
import { ListReportSubmissionData } from '../../../types/reportSubmission/reportSubmissionData.type';
import { SubmissionListData } from '../../../types/submission/submissionData.type';

@provide('SubmissionHeaderQuery')
export class SubmissionHeaderQuery {
  public async getAllSubmissionHeaderByVendorId<Property extends keyof SubmissionHeaderAttributes>(
    vendorId: number,
    attributes?: Property[],
    order?: [Property, 'ASC' | 'DESC'][],
  ): Promise<SubmissionHeaderAttributes[]> {
    return await SubmissionHeaderModel.findAll({ where: { vendor_id: vendorId }, attributes, order });
  }

  public async getSubmissionListForPreq({
    user,
    endDate,
    searchText,
    startDate,
  }: {
    user: UserData;
    searchText?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<SubmissionListData[]> {
    return await connectToPostgres.query(`SELECT * FROM trx.get_filtered_submission_list_for_preq(:user, :searchText, :startDate, :endDate)`, {
      replacements: {
        user: JSON.stringify(user),
        searchText: searchText || null,
        startDate: startDate || null,
        endDate: endDate || null,
      },
      type: QueryTypes.SELECT,
    });
  }

  public async getSubmissionHeaders<Property extends keyof SubmissionHeaderAttributes>({
    where,
    attributes,
    order,
    tran,
  }: {
    where?: { vendorIds?: number[]; is_release?: boolean; ids?: number[]; statuses?: SubmissionStatusDocument[] };
    attributes?: Property[];
    order?: [keyof SubmissionHeaderAttributes, 'ASC' | 'DESC'][];
    tran?: Transaction;
  }): Promise<Pick<SubmissionHeaderAttributes, Property>[]> {
    const whereCondition: WhereClause<SubmissionHeaderModel> = {};

    if (where?.ids) {
      whereCondition.id = { [Op.in]: where.ids };
    }

    if (where?.vendorIds !== undefined) {
      whereCondition.vendor_id = { [Op.in]: where.vendorIds };
    }

    if (where?.is_release !== undefined) {
      whereCondition.is_release = where.is_release;
    }

    if (where?.statuses) {
      whereCondition.status = { [Op.in]: where.statuses };
    }

    return await SubmissionHeaderModel.findAll({ where: whereCondition, attributes, order, transaction: tran });
  }

  public async getSubmissionHeader<Property extends keyof SubmissionHeaderAttributes>({
    where,
    attributes,
    order,
    tran,
  }: {
    where?: { vendorIds?: number[]; is_release?: boolean; ids?: number[]; statuses?: SubmissionStatusDocument[] };
    attributes?: Property[];
    order?: [keyof SubmissionHeaderAttributes, 'ASC' | 'DESC'][];
    tran?: Transaction;
  }): Promise<Pick<SubmissionHeaderAttributes, Property> | null> {
    const whereCondition: WhereClause<SubmissionHeaderModel> = {};

    if (where?.ids) {
      whereCondition.id = { [Op.in]: where.ids };
    }

    if (where?.vendorIds !== undefined) {
      whereCondition.vendor_id = { [Op.in]: where.vendorIds };
    }

    if (where?.is_release !== undefined) {
      whereCondition.is_release = where.is_release;
    }

    if (where?.statuses) {
      whereCondition.status = { [Op.in]: where.statuses };
    }

    return await SubmissionHeaderModel.findOne({ where: whereCondition, attributes, order, transaction: tran });
  }

  public async getAllSubmissionHeaderByVendorIdAndStatuses<Property extends keyof SubmissionHeaderAttributes>(
    vendorId: number,
    statuses: number[],
    attributes?: Property[],
    order?: [Property, 'ASC' | 'DESC'][],
  ): Promise<SubmissionHeaderAttributes[]> {
    return await SubmissionHeaderModel.findAll({ where: { vendor_id: vendorId, status: { [Op.in]: statuses } }, attributes, order });
  }

  public async getAllSubmissionHeaderByCreatedBy<Property extends keyof SubmissionHeaderAttributes>(
    createdBy: string,
    attributes?: Property[],
    order?: [Property, 'ASC' | 'DESC'][],
  ): Promise<SubmissionHeaderAttributes[]> {
    return await SubmissionHeaderModel.findAll({ where: { created_by: createdBy }, attributes, order });
  }

  public async getAllSubmissionHeaderWithoutDraftStatus<Property extends keyof SubmissionHeaderAttributes>(
    attributes?: Property[],
    order?: [Property, 'ASC' | 'DESC'][],
  ): Promise<SubmissionHeaderAttributes[]> {
    return await SubmissionHeaderModel.findAll({ where: { status: { [Op.ne]: SubmissionStatusDocument.Draft } }, attributes, order });
  }

  public async getAllSubmissionHeaderByStatus<Property extends keyof SubmissionHeaderAttributes>({
    status,
    attributes,
    order,
    tran,
  }: {
    status: number;
    attributes?: Property[];
    order?: [keyof SubmissionHeaderAttributes, 'ASC' | 'DESC'][];
    tran?: Transaction;
  }): Promise<Pick<SubmissionHeaderAttributes, Property>[]> {
    return await SubmissionHeaderModel.findAll({ where: { status }, attributes, order, transaction: tran });
  }

  public async saveSubmissionHeader(param: Omit<SubmissionHeaderAttributes, 'id'>, tran?: Transaction): Promise<SubmissionHeaderAttributes> {
    return await SubmissionHeaderModel.create(param, { transaction: tran });
  }

  public async updateSubmissionHeader(param: Partial<SubmissionHeaderAttributes> & { id: number }, tran?: Transaction) {
    await SubmissionHeaderModel.update(param, { where: { id: param.id }, transaction: tran });
  }

  public async updateSubmissionHeaderStatus(status: number, whereStatus: number, tran?: Transaction) {
    await SubmissionHeaderModel.update({ status }, { where: { status: whereStatus }, transaction: tran });
  }

  public async deleteSubmissionHeaderById(submissionHeaderId: number, tran?: Transaction) {
    await SubmissionHeaderModel.destroy({ where: { id: submissionHeaderId }, transaction: tran });
  }

  public async setStatusSubmissionHeaderById(
    submissionHeaderId: number,
    param: Pick<SubmissionHeaderAttributes, 'status' | 'approved_by' | 'score_collection' | 'score_review'>,
    tran?: Transaction,
  ) {
    await SubmissionHeaderModel.update(param, { where: { id: submissionHeaderId }, transaction: tran });
  }

  public async getReportActionHistory(username: string, startDate: Date, endDate: Date): Promise<ListReportSubmissionData[]> {
    const data: ListReportSubmissionData[] = await connectToPostgres.query(
      `SELECT * FROM trx.report_action_history_preq(:username, :startDate, :endDate)`,
      {
        replacements: {
          username,
          startDate: startDate,
          endDate: endDate,
        },
        type: QueryTypes.SELECT,
      },
    );

    return data;
  }
}
