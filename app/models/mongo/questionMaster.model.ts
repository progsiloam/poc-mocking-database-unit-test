import { Document, model, Schema } from 'mongoose';
import type { Options, Questions } from '../../types/commonMaster.type';

interface QuestionMasterDocument extends Questions, Document {}

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

const questionMasterSchema = new Schema<QuestionMasterDocument>(
  {
    code: { type: String, required: true, unique: true },
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
  { collection: 'QuestionMaster' },
);

const QuestionMaster = model<QuestionMasterDocument>('QuestionMaster', questionMasterSchema);
export { QuestionMaster, QuestionMasterDocument };
