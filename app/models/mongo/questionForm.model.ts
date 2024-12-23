import { Document, model, Schema } from 'mongoose';
import type { Options, QuestionFormMaster, Questions, Sections, StaticQuestion } from '../../types/commonMaster.type';

interface QuestionFormDocument extends QuestionFormMaster, Document {}

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

const questionSchema = new Schema<Questions>(
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
  },
  { _id: false },
);

const staticQuestionSchema = new Schema<StaticQuestion>(
  {
    code: { type: String, required: true },
    input_type: { type: String, required: true },
    question_score: { type: Number, required: true },
  },
  { _id: false },
);

const sectionsSchema = new Schema<Sections>(
  {
    code: { type: String, required: true },
    name: { type: String, required: false, default: '' },
    sub_name: { type: String, required: false, default: '' },
    questions: { type: [questionSchema], required: true },
  },
  { _id: false },
);

const questionFormSchema = new Schema<QuestionFormDocument>(
  {
    major_id: { type: Number, required: true },
    version: { type: Number, required: true, default: 1 },
    static_question: { type: [staticQuestionSchema], required: true },
    dynamic_question: { type: [sectionsSchema], required: true },
    created_by: { type: String, required: true },
    created_on: { type: Date, required: true },
    modified_by: { type: String, required: true },
    modified_on: { type: Date, required: true },
  },
  { collection: 'QuestionForm' },
);

const QuestionForm = model<QuestionFormDocument>('QuestionForm', questionFormSchema);
export { QuestionForm, QuestionFormDocument };
