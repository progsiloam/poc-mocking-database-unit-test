import moment from 'moment';
import { Submissions } from '../../app/types/common';
import { dynamic_question_data_submit, static_question_data_submit } from './submissionForm';

const DOC_1: Submissions[] = [
  {
    _id: `675149f6094164000c7569ef`,
    static_question: static_question_data_submit,
    dynamic_question: dynamic_question_data_submit,
    last_sync: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 0,
    version: 1,
  },
  {
    _id: `67514a0de52ff7000cc33fa7`,
    static_question: static_question_data_submit,
    dynamic_question: dynamic_question_data_submit,
    last_sync: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 3,
    version: 1,
  },
];

const DOC_2: Submissions[] = [
  {
    _id: `648d1f3e5d8eac3b5c4e1234`,
    static_question: static_question_data_submit,
    dynamic_question: dynamic_question_data_submit,
    last_sync: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 0,
    version: 1,
  },
  {
    _id: `648d1f3e5d8eac3b5c4e5678`,
    static_question: static_question_data_submit,
    dynamic_question: dynamic_question_data_submit,
    last_sync: moment().set('month', 0).set('date', 1).toDate(),
    major_id: 3,
    version: 1,
  },
];

export const seedingSubmissions: Submissions[] = [
  //
  ...DOC_1,
  ...DOC_2,
];
