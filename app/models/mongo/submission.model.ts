import { Document, Schema, model } from 'mongoose';
import type { ObjectMarked, Options, QuestionSubmission, SectionsSubmission, StaticQuestionSubmission, Submissions } from '../../types/common.type';

interface SubmissionDocument extends Submissions, Document {
  _id: string;
}

const optionsSchema = new Schema<Options>(
  {
    option_text: {
      type: {
        id: { type: String, required: false, default: '' },
        eng: { type: String, required: false, default: '' },
      },
      required: false,
      _id: false,
    },
    option_score: { type: Number, required: false, default: undefined },
  },
  { _id: false },
);

const markedQuestionSchema = new Schema<ObjectMarked>(
  {
    username: { type: String, required: false, default: '' },
    note: { type: String, required: false, default: '' },
    checked: { type: Boolean, required: false, default: false },
  },
  { _id: false },
);

const questionSchema = new Schema<QuestionSubmission>(
  {
    code: { type: String, required: true },
    question_text: {
      type: {
        id: { type: String, required: true, default: '' },
        eng: { type: String, required: true, default: '' },
      },
      required: true,
      _id: false,
    },
    input_type: { type: String, required: true },
    options: { type: [optionsSchema], required: false, default: undefined },
    question_score: { type: Number, required: true, default: 0 },
    is_required: { type: Boolean, required: true, default: false },
    user_answer: { type: [[String]], required: true },
    answer_score: { type: Number, required: true },
    marked: { type: markedQuestionSchema, required: false, default: undefined },
  },
  { _id: false },
);

const staticQuestionSchema = new Schema<StaticQuestionSubmission>(
  {
    code: { type: String, required: true },
    question_text: {
      type: {
        id: { type: String, required: true, default: '' },
        eng: { type: String, required: true, default: '' },
      },
      required: true,
      _id: false,
    },
    answer_score: { type: Number, required: true },
    input_type: { type: String, required: true },
    question_score: { type: Number, required: true },
    user_answer: { type: [[String]], required: true },
    marked: { type: markedQuestionSchema, required: false, default: undefined },
  },
  { _id: false },
);

const sectionSubmissionSchema = new Schema<SectionsSubmission>(
  {
    code: { type: String, required: true },
    name: { type: String, required: false, default: undefined },
    sub_name: { type: String, required: false, default: undefined },
    questions: { type: [questionSchema], required: true },
  },
  { _id: false },
);

const subbmissionSchema = new Schema<SubmissionDocument>(
  {
    _id: { type: String, required: true },
    major_id: { type: Number, required: true },
    static_question: { type: [staticQuestionSchema], required: true },
    dynamic_question: { type: [sectionSubmissionSchema], required: true },
    version: { type: Number, required: true, default: 1 },
    last_sync: { type: Date, required: true },
  },
  { collection: 'Submissions' },
);

const Submission = model<SubmissionDocument>('Submissions', subbmissionSchema);
export { Submission, SubmissionDocument };
