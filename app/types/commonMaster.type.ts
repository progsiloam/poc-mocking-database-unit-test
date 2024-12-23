interface QuestionSubmission extends Questions {
  user_answer: string[];
  answer_score: number;
}

export interface SectionsSubmission extends Sections {
  questions: (QuestionsWithId & QuestionSubmission)[];
}

export const StaticInputTypes = ['Title', 'Text Field', 'File Upload', 'File Upload (expiry)', 'Sub Major', 'Item Level'] as const;

export const InputType = [
  'Short Answer',
  'Paragraph',
  'Multiple Choice',
  'Checkboxes',
  'Dropdown',
  'File Upload',
  'File Upload (expiry)',
  'Date',
] as const;

export interface Content {
  id: string;
  eng: string;
}

export interface Options {
  option_text: Content;
  option_score: number;
}

export interface Questions {
  code?: string;
  question_text: Content;
  input_type: (typeof InputType)[number];
  options: Options[];
  question_score: number;
  is_required: boolean;
}

export interface QuestionsWithId extends Questions {
  _id: string;
}

export interface StaticQuestion {
  code: string;
  input_type: (typeof StaticInputTypes)[number];
  question_score: number;
}

export interface Sections {
  code: string;
  name?: string;
  sub_name?: string;
  questions: Questions[];
}

export interface QuestionForm {
  major_id: number; // id dari pg
  static_question: StaticQuestion[];
  dynamic_question: Sections[];
  version: number;
}

export interface QuestionFormMaster extends QuestionForm {
  created_on: Date;
  created_by: string;
  modified_by: string;
  modified_on: Date;
}

export interface Submission extends Omit<QuestionForm, 'sections'> {
  sections: SectionsSubmission[];
}
