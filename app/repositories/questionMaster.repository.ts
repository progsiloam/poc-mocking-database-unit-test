import { ShgError } from '@siloamhospitals/erp-template-expressjs-library';
import { inject } from 'inversify';
import { provide } from 'inversify-binding-decorators';
import mongoose from 'mongoose';
import type { QuestionMasterQuery } from '../queries/mongo/questionMaster.query';
import type { Questions } from '../types/commonMaster.type';
import type { QuestionMasterParams } from '../types/questionMaster/questionMasterParams.type';
import { generateNewQuestionCode } from '../utils/generate';

@provide('QuestionMasterRepository')
export class QuestionMasterRepository {
  constructor(@inject('QuestionMasterQuery') private readonly questionMasterQuery: QuestionMasterQuery) {}

  public async getAllQuestions(): Promise<Questions[]> {
    const questions = await this.questionMasterQuery.getAllQuestion({ code: -1 });
    if (questions.length === 0) {
      throw new ShgError('Questions not found');
    }

    return questions;
  }

  public async getQuestionById(questionId: string): Promise<Questions> {
    const question = await this.questionMasterQuery.getQuestionById(questionId);
    if (!question) {
      throw new ShgError('Question not found');
    }

    return question;
  }

  public async saveAndUpdateQuestion(param: QuestionMasterParams) {
    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      if (param._id) {
        await this.questionMasterQuery.updateQuestion(param);
      } else {
        const newQuestionCode = await generateNewQuestionCode();
        const data: Questions = {
          ...param,
          code: newQuestionCode,
        };
        await this.questionMasterQuery.saveQuestion(data, session);
      }

      await session.commitTransaction();
      session.endSession();
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  public async deleteQuestion(questionId: string) {
    const question = await this.questionMasterQuery.getQuestionById(questionId);
    if (!question) {
      throw new ShgError('Question not found');
    }

    return await this.questionMasterQuery.deleteQuestion(questionId);
  }
}
