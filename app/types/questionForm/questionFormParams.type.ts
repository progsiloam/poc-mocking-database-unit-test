import type { QuestionForm } from '../commonMaster.type';

export interface QuestionFormParams extends Omit<QuestionForm, 'created_on' | 'modified_on' | 'created_by' | 'modified_by'> {}

export interface QuestionFormSetActiveVersion {
  major_id: number;
  version: number;
}
