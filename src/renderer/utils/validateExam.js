var Ajv = require('ajv')
var ajv = new Ajv({ allErrors: true })

var schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['title', 'code', 'time', 'pass', 'cover', 'test'],
  properties: {
    author: {
      $id: '#/properties/author',
      type: 'string',
      title: 'The Author Schema',
      default: 'anonymous',
      pattern: '^(.*)$'
    },
    title: {
      $id: '#/properties/title',
      type: 'string',
      title: 'The Title Schema',
      default: 'Untitled Exam',
      examples: ['Oracle Database'],
      pattern: '^(.*)$'
    },
    code: {
      $id: '#/properties/code',
      type: 'string',
      title: 'The Code Schema',
      default: '000-000',
      examples: ['1z0-061'],
      pattern: '^(.*)$'
    },
    time: {
      $id: '#/properties/time',
      type: 'integer',
      title: 'The Time Schema',
      default: 60,
      examples: [120]
    },
    pass: {
      $id: '#/properties/pass',
      type: 'integer',
      title: 'The Pass Schema',
      default: 60,
      examples: [65]
    },
    cover: {
      $id: '#/properties/cover',
      type: 'array',
      title: 'The Cover Schema',
      items: {
        $id: '#/properties/cover/items',
        type: 'object',
        title: 'The Cover Items Schema',
        required: ['variant', 'text'],
        properties: {
          variant: {
            $id: '#/properties/cover/items/properties/variant',
            type: 'integer',
            enum: [0, 1, 2],
            title: 'The Cover Item Variant Schema',
            default: 1,
            examples: [0]
          },
          text: {
            $id: '#/properties/cover/items/properties/text',
            type: 'string',
            title: 'The Cover Item Text Schema',
            default: '',
            examples: [
              'https://www.oracle.com/webfolder/s/brand/assets/i/specimens/identity/logo/primary-sig.gif'
            ],
            pattern: '^(.*)$'
          }
        }
      }
    },
    test: {
      $id: '#/properties/test',
      type: 'array',
      title: 'The Test Schema',
      items: {
        $id: '#/properties/test/items',
        type: 'object',
        title: 'The Test Items Schema',
        required: ['variant', 'question', 'choices', 'answer', 'explanation'],
        properties: {
          variant: {
            $id: '#/properties/test/items/properties/variant',
            type: 'integer',
            enum: [0, 1, 2, 3],
            title: 'The Question Variant Schema',
            default: 0,
            examples: [1]
          },
          question: {
            $id: '#/properties/test/items/properties/question',
            type: 'array',
            title: 'The Question Item Schema',
            items: {
              $id: '#/properties/test/items/properties/question/items',
              type: 'object',
              title: 'The Items Schema',
              required: ['variant', 'text'],
              properties: {
                variant: {
                  $id: '#/properties/test/items/properties/question/items/properties/variant',
                  type: 'integer',
                  enum: [0, 1, 2],
                  title: 'The Question Item Variant Schema',
                  default: 1,
                  examples: [1]
                },
                text: {
                  $id: '#/properties/test/items/properties/question/items/properties/text',
                  type: 'string',
                  title: 'The Question Item Text Schema',
                  default: '',
                  examples: [
                    'Which three tasks can be performed using SQL functions built into Oracle Database?'
                  ],
                  pattern: '^(.*)$'
                }
              }
            }
          },
          choices: {
            $id: '#/properties/test/items/properties/choices',
            type: 'array',
            title: 'The Choices Schema',
            items: {
              $id: '#/properties/test/items/properties/choices/items',
              type: 'object',
              title: 'The Choice Items Schema',
              required: ['label', 'text'],
              properties: {
                label: {
                  $id: '#/properties/test/items/properties/choices/items/properties/label',
                  type: ['string', 'integer'],
                  title: 'The Choice Label Schema',
                  default: 'A',
                  examples: ['A'],
                  pattern: '^(.*)$'
                },
                text: {
                  $id: '#/properties/test/items/properties/choices/items/properties/text',
                  type: 'string',
                  title: 'The Choice Text Schema',
                  default: '',
                  examples: ['Displaying a date in nondefault format'],
                  pattern: '^(.*)$'
                }
              }
            }
          },
          answer: {
            $id: '#/properties/test/items/properties/answer',
            type: 'array',
            title: 'The Answer Schema',
            items: {
              $id: '#/properties/test/items/properties/answer/items',
              type: 'boolean',
              title: 'The Answer Item Schema',
              default: false,
              examples: [true, true, true, false]
            }
          },
          explanation: {
            $id: '#/properties/test/items/properties/explanation',
            type: 'array',
            title: 'The Explanation Schema',
            items: {
              $id: '#/properties/test/items/properties/explanation/items',
              type: 'object',
              title: 'The Items Schema',
              required: ['variant', 'text'],
              properties: {
                variant: {
                  $id: '#/properties/test/items/properties/explanation/items/properties/variant',
                  type: 'integer',
                  enum: [0, 1, 2, 3],
                  title: 'The Explanation Variant Schema',
                  default: 1,
                  examples: [1]
                },
                text: {
                  $id: '#/properties/test/items/properties/explanation/items/properties/text',
                  type: 'string',
                  title: 'The Explanation Text Schema',
                  default: '',
                  examples: ['The answer to the question is 3 because 2 plus 1 equals 3'],
                  pattern: '^(.*)$'
                }
              }
            }
          }
        }
      }
    }
  }
}

var validate = ajv.compile(schema)

export default function(data) {
  var valid = validate(JSON.parse(data))
  return valid ? 'valid' : validate.errors
}
