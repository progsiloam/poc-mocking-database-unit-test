export interface QuestionSubmission extends Questions {
  code: string;
  user_answer: string[][];
  answer_score: number;
  marked?: ObjectMarked;
}

export interface StaticQuestionSubmission extends StaticQuestion {
  user_answer: string[][];
  marked?: ObjectMarked;
}

export interface SectionsSubmission extends Omit<Sections, 'questions'> {
  code: string;
  questions: (Questions & QuestionSubmission)[];
}

export interface ObjectMarked {
  username?: string;
  checked?: boolean;
  note?: string;
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
  question_text: Content;
  input_type: (typeof InputType)[number];
  options: Options[];
  question_score: number;
  is_required: boolean;
}

export interface StaticQuestion {
  code: string;
  question_text: Content;
  input_type: (typeof StaticInputTypes)[number];
  answer_score: number;
  question_score: number;
}

export interface Sections {
  name?: string;
  sub_name?: string;
  questions: Questions[];
}

export interface Questionnaires {
  major_id: number; // id dari pg
  sections: Sections[];
  version: number;
}

export interface QuestionnairesMaster extends Questionnaires {
  created_on: Date;
  created_by: string;
  modified_by: string;
  modified_on: Date;
}

export interface Submissions extends Omit<Questionnaires, 'sections'> {
  _id: string;
  static_question: StaticQuestionSubmission[];
  dynamic_question: SectionsSubmission[];
  last_sync: Date;
}

export interface SubmissionError {
  label: string;
  value: string | number;
  isDanger: boolean | undefined;
  isSuccess: boolean | undefined;
}
