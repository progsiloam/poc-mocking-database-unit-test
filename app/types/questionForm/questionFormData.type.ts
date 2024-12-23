export interface ListQuestionFormData {
  _id: string;
  major_id: number;
  major_name: string;
  total_question: number;
  version: number;
  updated_at: Date;
  updated_by: string;
}

export interface QuestionFormSetNewVersionData {
  major_id: number;
  version: number;
}
