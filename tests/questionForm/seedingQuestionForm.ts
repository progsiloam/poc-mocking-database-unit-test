import moment from 'moment';

export const seeding_question_form = [
  {
    _id: '67228502e845e05db65ce2d7',
    major_id: 0,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0002',
        input_type: 'Title',
        question_score: 1,
      },
      {
        code: 'Q0003',
        input_type: 'Text Field',
        question_score: 1,
      },
      {
        code: 'Q0058',
        input_type: 'Text Field',
        question_score: 1,
      },
      {
        code: 'Q0059',
        input_type: 'Text Field',
        question_score: 1,
      },
      {
        code: 'Q0086',
        input_type: 'File Upload',
        question_score: 1,
      },
      {
        code: 'Q0090',
        input_type: 'File Upload',
        question_score: 1,
      },
      {
        code: 'Q0089',
        input_type: 'File Upload',
        question_score: 1,
      },
      {
        code: 'Q0087',
        input_type: 'File Upload',
        question_score: 1,
      },
      {
        code: 'Q0093',
        input_type: 'File Upload (expiry)',
        question_score: 1,
      },
      {
        code: 'Q0092',
        input_type: 'File Upload',
        question_score: 1,
      },
      {
        code: 'Q0042',
        input_type: 'File Upload (expiry)',
        question_score: 0,
      },
    ],
    dynamic_question: [
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
            question_score: 5,
            is_required: false,
          },
          {
            code: 'DQ0002',
            question_text: {
              id: 'ceritakan tentang diri anda?',
              eng: 'tell me about yourself?',
            },
            input_type: 'Paragraph',
            options: [],
            question_score: 5,
            is_required: false,
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
                option_score: 50,
              },
            ],
            question_score: 0,
            is_required: false,
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
          },
        ],
      },
    ],
  },
  {
    _id: '6722852ee845e05db65ce2db',
    major_id: 1,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'PQ001',
        input_type: 'Sub Major',
        question_score: 0,
      },
      {
        code: 'Q0094',
        input_type: 'File Upload (expiry)',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgyt',
      },
    ],
  },
  {
    _id: '9a6d82c7f03be1548d1f9e02',
    major_id: 2,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'PQ001',
        input_type: 'Sub Major',
        question_score: 0,
      },
      {
        code: 'Q0094',
        input_type: 'File Upload (expiry)',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgyt',
      },
    ],
  },
  {
    _id: '67228535e845e05db65ce2dd',
    major_id: 3,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fghtew',
      },
    ],
  },
  {
    _id: '6722853de845e05db65ce2df',
    major_id: 4,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: '35tht',
      },
    ],
  },
  {
    _id: '67228544e845e05db65ce2e1',
    major_id: 5,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfhtr',
      },
    ],
  },
  {
    _id: '6722854ae845e05db65ce2e3',
    major_id: 6,
    version: 1,
    created_by: 'system',
    created_on: '2024-10-31T03:03:45.050Z',
    modified_by: 'system',
    modified_on: '2024-10-31T03:03:45.050Z',
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 90,
      },
    ],
    dynamic_question: [
      {
        code: 'vbgrty',
        name: 'Section 5',
        sub_name: '',
        questions: [
          {
            code: 'DQ0004',
            question_text: {
              id: 'g',
              eng: 'bv',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: false,
          },
        ],
      },
    ],
  },
  {
    _id: '67228590e845e05db65ce2e7',
    major_id: 35,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgy432',
      },
    ],
  },
  {
    _id: '672285a3e845e05db65ce2eb',
    major_id: 36,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '64c73b7e5f1c1e4a8c2a9f21',
    major_id: 37,
    version: 1,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '5f8d8c1b34e07a6df9b12345',
    major_id: 36,
    version: 2,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '60cb21e6459f7c18de67fa10',
    major_id: 36,
    version: 3,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '4a93db5709e4ac1f2d981d23',
    major_id: 36,
    version: 4,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '3c7b21e5a9f68b7cdf90e146',
    major_id: 36,
    version: 5,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
  {
    _id: '7d42fa6e1b3c90f5d8a4e027',
    major_id: 36,
    version: 6,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
    static_question: [
      {
        code: 'Q0094',
        input_type: 'File Upload',
        question_score: 10,
      },
    ],
    dynamic_question: [
      {
        name: 'Section 5',
        questions: [
          {
            question_text: {
              id: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
              eng: 'Donec eu velit volutpat, cursus erat sed, pretium est. Nunc a neque nulla. Duis dapibus vehicula nisi, non ornare purus fermentum id. Vivamus vel urna nec dui auctor interdum Lorem ipsum dolor sit ame',
            },
            input_type: 'Short Answer',
            options: [],
            question_score: 10,
            is_required: true,
            code: 'DQ0001',
          },
        ],
        code: 'fgfgrhgb',
      },
    ],
  },
];

export const seeding_question_form_active_config = [
  {
    major_id: 0,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 1,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 2,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 3,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 4,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 5,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 6,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 35,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 36,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
  {
    major_id: 37,
    version: 1,
    total_question: 0,
    created_by: 'system',
    created_on: moment('2014-04-23T09:54:51').toDate(),
    modified_by: 'system',
    modified_on: moment('2014-04-23T09:54:51').toDate(),
  },
];

export const seeding_expected_question_form = [
  {
    _id: '67228502e845e05db65ce2d7',
    major_id: 0,
    major_name: 'General',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '6722852ee845e05db65ce2db',
    major_id: 1,
    major_name: 'CONSTRUCTION',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '9a6d82c7f03be1548d1f9e02',
    major_id: 2,
    major_name: 'CORPORATE SERVICES',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '67228535e845e05db65ce2dd',
    major_id: 3,
    major_name: 'FACILITY MAINTENANCE & SERVICES',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '6722853de845e05db65ce2df',
    major_id: 4,
    major_name: 'GENERAL SUPPLIES & EQUIPMENT',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '67228544e845e05db65ce2e1',
    major_id: 5,
    major_name: 'INFORMATION & COMMUNICATION TECHNOLOGY',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '6722854ae845e05db65ce2e3',
    major_id: 6,
    major_name: 'MARKETING',
    total_question: 0,
    version: 1,
    updated_at: new Date('2024-10-31T03:03:45.050Z'),
    updated_by: 'system',
  },
  {
    _id: '67228590e845e05db65ce2e7',
    major_id: 35,
    major_name: 'GENERAL EQUIPMENT',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '672285a3e845e05db65ce2eb',
    major_id: 36,
    major_name: 'GENERAL SUPPLIES',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
  {
    _id: '64c73b7e5f1c1e4a8c2a9f21',
    major_id: 37,
    major_name: 'ICT',
    total_question: 0,
    version: 1,
    updated_at: moment('2014-04-23T09:54:51').toDate(),
    updated_by: 'system',
  },
];

export const seeding_expected_version_question_form_major_id = [1, 2, 3, 4, 5, 6];
