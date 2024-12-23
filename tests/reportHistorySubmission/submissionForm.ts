import { SectionsSubmission, StaticQuestionSubmission } from '../../app/types/common';

export const static_question_data_draft: StaticQuestionSubmission[] = [
  {
    code: 'Q0002',
    question_text: {
      id: 'Company Name/Nama Perusahaan',
      eng: 'Company Name/Nama Perusahaan',
    },
    answer_score: 0,
    input_type: 'Title',
    question_score: 1,
    user_answer: [['Pagi Cerah 2']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0003',
    question_text: {
      id: 'Legal Address/Alamat Legal (Sesuai dengan Akta Perusahaan)',
      eng: 'Legal Address/Alamat Legal (Sesuai dengan Akta Perusahaan)',
    },
    answer_score: 0,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [['testing']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0058',
    question_text: {
      id: 'Reference Contact Person',
      eng: 'Reference Contact Person',
    },
    answer_score: 0,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [[]],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0059',
    question_text: {
      id: 'Reference Contact Number',
      eng: 'Reference Contact Number',
    },
    answer_score: 0,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [[]],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0086',
    question_text: {
      id: 'Surat Etika Perusahaan',
      eng: 'Surat Etika Perusahaan',
    },
    answer_score: 0,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['a2fac0a8-5e48-4fe4-b4bb-75862ac5550b']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0090',
    question_text: {
      id: 'NPWP',
      eng: 'NPWP',
    },
    answer_score: 0,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['8ae35910-b40e-4257-8b86-efafe5837e74']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0089',
    question_text: {
      id: 'NIB',
      eng: 'NIB',
    },
    answer_score: 0,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['cde5be50-1699-48d4-aac7-c11eb3fc9ebb']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0087',
    question_text: {
      id: 'Akta Pendirian',
      eng: 'Akta Pendirian',
    },
    answer_score: 0,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['eef5ab05-552c-4d48-acb7-38bff385496a']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0093',
    question_text: {
      id: 'Surat Keterangan Non PKP',
      eng: 'Surat Keterangan Non PKP',
    },
    answer_score: 0,
    input_type: 'File Upload (expiry)',
    question_score: 1,
    user_answer: [['2034-10-01', '8b94145e-541e-4c5c-967b-d21b1315b90e']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0092',
    question_text: {
      id: 'Product List',
      eng: 'Product List',
    },
    answer_score: 0,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['7822e794-5535-476d-9f78-ab1e901578ef']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0042',
    question_text: {
      id: 'Rekening Koran 3',
      eng: 'Rekening Koran 3',
    },
    answer_score: 0,
    input_type: 'File Upload (expiry)',
    question_score: 0,
    user_answer: [
      ['53ef0058-e4e1-4ea9-b758-3d8e6d090480'],
      ['a3934feb-f697-4e4d-939f-dcde091f81d5'],
      ['3c704b3a-e9fd-4f7e-8544-61b70eadbc13'],
      ['1c92d7e8-4d2c-4140-98ec-0de6450b893e'],
      ['8d50f3d9-13fe-43d4-b0a1-1058c9ca80b0'],
    ],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
];

export const dynamic_question_data_draft: SectionsSubmission[] = [
  {
    code: 'xfv',
    name: 'Section 1',
    sub_name: '',
    questions: [
      {
        code: 'DQ0001',
        question_text: {
          id: 'dimana rumah anda?',
          eng: 'where is your home?',
        },
        input_type: 'Short Answer',
        options: [],
        question_score: 10,
        is_required: false,
        user_answer: [['Depok']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0002',
        question_text: {
          id: 'ceritakan tentang diri anda?',
          eng: 'tell me about yourself?',
        },
        input_type: 'Paragraph',
        options: [],
        question_score: 10,
        is_required: false,
        user_answer: [['ok lah']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0003',
        question_text: {
          id: 'apakah anda bersedia tinggal dijakarta?',
          eng: 'are you willing to live in Jakarta?',
        },
        input_type: 'Checkboxes',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['true']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0004',
        question_text: {
          id: 'kapan anda lahir?',
          eng: 'when were you born?',
        },
        input_type: 'Date',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['2025-01-11']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0005',
        question_text: {
          id: 'Makanan favoritmu?',
          eng: 'Your favorite food?',
        },
        input_type: 'Dropdown',
        options: [
          {
            option_text: {
              id: 'Rendang Id',
              eng: 'Rendang Eng',
            },
            option_score: 5,
          },
          {
            option_text: {
              id: 'Bakso Id',
              eng: 'Bakso Eng',
            },
            option_score: 0,
          },
        ],
        question_score: 0,
        is_required: false,
        user_answer: [['Rendang Id']],
        answer_score: 0,
        marked: {
          username: '',
          note: 'jangan rendang',
          checked: true,
        },
      },
      {
        code: 'DQ0006',
        question_text: {
          id: 'Bahasa pemrograman apa yang Anda kuasai? new',
          eng: 'What programming languages ​​do you master? new',
        },
        input_type: 'Multiple Choice',
        options: [
          {
            option_text: {
              id: 'MySQL ID',
              eng: 'MySQL Eng',
            },
            option_score: 5,
          },
          {
            option_text: {
              id: 'C++ ID',
              eng: 'C++ Eng',
            },
            option_score: 40,
          },
        ],
        question_score: 0,
        is_required: false,
        user_answer: [['MySQL ID', 'C++ ID']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQe4bd6bbd',
        question_text: {
          id: 'KTP',
          eng: 'KTP',
        },
        input_type: 'File Upload',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['3dd19455-7582-4181-a3cd-3163d191ac17']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQfc8ce9ea',
        question_text: {
          id: 'SKCK',
          eng: 'SKCK',
        },
        input_type: 'File Upload (expiry)',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['2025-01-11T07:00:00.000Z', '9436b21d-22d4-42c9-ac20-7c9e1094f143']],
        answer_score: 0,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
    ],
  },
];

export let static_question_data_submit: StaticQuestionSubmission[] = [
  {
    code: 'Q0002',
    question_text: {
      id: 'Company Name/Nama Perusahaan',
      eng: 'Company Name/Nama Perusahaan',
    },
    answer_score: 1,
    input_type: 'Title',
    question_score: 1,
    user_answer: [['Pagi Cerah 2']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0003',
    question_text: {
      id: 'Legal Address/Alamat Legal (Sesuai dengan Akta Perusahaan)',
      eng: 'Legal Address/Alamat Legal (Sesuai dengan Akta Perusahaan)',
    },
    answer_score: 1,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [['testing']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0058',
    question_text: {
      id: 'Reference Contact Person',
      eng: 'Reference Contact Person',
    },
    answer_score: 0,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [[]],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0059',
    question_text: {
      id: 'Reference Contact Number',
      eng: 'Reference Contact Number',
    },
    answer_score: 0,
    input_type: 'Text Field',
    question_score: 1,
    user_answer: [[]],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0086',
    question_text: {
      id: 'Surat Etika Perusahaan',
      eng: 'Surat Etika Perusahaan',
    },
    answer_score: 1,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['a2fac0a8-5e48-4fe4-b4bb-75862ac5550b']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0090',
    question_text: {
      id: 'NPWP',
      eng: 'NPWP',
    },
    answer_score: 1,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['8ae35910-b40e-4257-8b86-efafe5837e74']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0089',
    question_text: {
      id: 'NIB',
      eng: 'NIB',
    },
    answer_score: 1,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['cde5be50-1699-48d4-aac7-c11eb3fc9ebb']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0087',
    question_text: {
      id: 'Akta Pendirian',
      eng: 'Akta Pendirian',
    },
    answer_score: 1,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['eef5ab05-552c-4d48-acb7-38bff385496a']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0093',
    question_text: {
      id: 'Surat Keterangan Non PKP',
      eng: 'Surat Keterangan Non PKP',
    },
    answer_score: 1,
    input_type: 'File Upload (expiry)',
    question_score: 1,
    user_answer: [['2034-10-01', '8b94145e-541e-4c5c-967b-d21b1315b90e']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0092',
    question_text: {
      id: 'Product List',
      eng: 'Product List',
    },
    answer_score: 1,
    input_type: 'File Upload',
    question_score: 1,
    user_answer: [['7822e794-5535-476d-9f78-ab1e901578ef']],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
  {
    code: 'Q0042',
    question_text: {
      id: 'Rekening Koran 3',
      eng: 'Rekening Koran 3',
    },
    answer_score: 0,
    input_type: 'File Upload (expiry)',
    question_score: 0,
    user_answer: [
      ['53ef0058-e4e1-4ea9-b758-3d8e6d090480'],
      ['a3934feb-f697-4e4d-939f-dcde091f81d5'],
      ['3c704b3a-e9fd-4f7e-8544-61b70eadbc13'],
      ['1c92d7e8-4d2c-4140-98ec-0de6450b893e'],
      ['8d50f3d9-13fe-43d4-b0a1-1058c9ca80b0'],
    ],
    marked: {
      username: '',
      note: '',
      checked: false,
    },
  },
];

export const dynamic_question_data_submit: SectionsSubmission[] = [
  {
    code: 'xfv',
    name: 'Section 1',
    sub_name: '',
    questions: [
      {
        code: 'DQ0001',
        question_text: {
          id: 'dimana rumah anda?',
          eng: 'where is your home?',
        },
        input_type: 'Short Answer',
        options: [],
        question_score: 10,
        is_required: false,
        user_answer: [['Depok']],
        answer_score: 10,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0002',
        question_text: {
          id: 'ceritakan tentang diri anda?',
          eng: 'tell me about yourself?',
        },
        input_type: 'Paragraph',
        options: [],
        question_score: 10,
        is_required: false,
        user_answer: [['ok lah']],
        answer_score: 10,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0003',
        question_text: {
          id: 'apakah anda bersedia tinggal dijakarta?',
          eng: 'are you willing to live in Jakarta?',
        },
        input_type: 'Checkboxes',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['true']],
        answer_score: 5,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0004',
        question_text: {
          id: 'kapan anda lahir?',
          eng: 'when were you born?',
        },
        input_type: 'Date',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['2025-01-11']],
        answer_score: 5,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQ0005',
        question_text: {
          id: 'Makanan favoritmu?',
          eng: 'Your favorite food?',
        },
        input_type: 'Dropdown',
        options: [
          {
            option_text: {
              id: 'Rendang Id',
              eng: 'Rendang Eng',
            },
            option_score: 5,
          },
          {
            option_text: {
              id: 'Bakso Id',
              eng: 'Bakso Eng',
            },
            option_score: 0,
          },
        ],
        question_score: 0,
        is_required: false,
        user_answer: [['Rendang Id']],
        answer_score: 5,
        marked: {
          username: '',
          note: 'jangan rendang',
          checked: true,
        },
      },
      {
        code: 'DQ0006',
        question_text: {
          id: 'Bahasa pemrograman apa yang Anda kuasai? new',
          eng: 'What programming languages ​​do you master? new',
        },
        input_type: 'Multiple Choice',
        options: [
          {
            option_text: {
              id: 'MySQL ID',
              eng: 'MySQL Eng',
            },
            option_score: 5,
          },
          {
            option_text: {
              id: 'C++ ID',
              eng: 'C++ Eng',
            },
            option_score: 40,
          },
        ],
        question_score: 0,
        is_required: false,
        user_answer: [['MySQL ID', 'C++ ID']],
        answer_score: 45,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQe4bd6bbd',
        question_text: {
          id: 'KTP',
          eng: 'KTP',
        },
        input_type: 'File Upload',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['3dd19455-7582-4181-a3cd-3163d191ac17']],
        answer_score: 5,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
      {
        code: 'DQfc8ce9ea',
        question_text: {
          id: 'SKCK',
          eng: 'SKCK',
        },
        input_type: 'File Upload (expiry)',
        options: [],
        question_score: 5,
        is_required: false,
        user_answer: [['2025-01-11T07:00:00.000Z', '9436b21d-22d4-42c9-ac20-7c9e1094f143']],
        answer_score: 5,
        marked: {
          username: '',
          note: '',
          checked: false,
        },
      },
    ],
  },
];
