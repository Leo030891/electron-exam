var Ajv = require('ajv')
var ajv = new Ajv()

var schema = {
  definitions: {},
  $schema: 'http://json-schema.org/draft-07/schema#',
  $id: 'http://example.com/root.json',
  type: 'object',
  title: 'The Root Schema',
  required: ['title', 'code', 'time', 'pass', 'cover', 'test'],
  properties: {
    title: {
      $id: '#/properties/title',
      type: 'string',
      title: 'The Title Schema',
      default: '',
      examples: ['Oracle Database'],
      pattern: '^(.*)$'
    },
    code: {
      $id: '#/properties/code',
      type: 'string',
      title: 'The Code Schema',
      default: '',
      examples: ['1z0-061'],
      pattern: '^(.*)$'
    },
    time: {
      $id: '#/properties/time',
      type: 'integer',
      title: 'The Time Schema',
      default: 0,
      examples: [120]
    },
    pass: {
      $id: '#/properties/pass',
      type: 'integer',
      title: 'The Pass Schema',
      default: 0,
      examples: [65]
    },
    cover: {
      $id: '#/properties/cover',
      type: 'array',
      title: 'The Cover Schema',
      items: {
        $id: '#/properties/cover/items',
        type: 'object',
        title: 'The Items Schema',
        required: ['variant', 'text'],
        properties: {
          variant: {
            $id: '#/properties/cover/items/properties/variant',
            type: 'integer',
            enum: [0, 1],
            title: 'The Variant Schema',
            default: 0,
            examples: [0]
          },
          text: {
            $id: '#/properties/cover/items/properties/text',
            type: 'string',
            title: 'The Text Schema',
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
        title: 'The Items Schema',
        required: ['variant', 'question', 'choices', 'answer', 'explanation'],
        properties: {
          variant: {
            $id: '#/properties/test/items/properties/variant',
            type: 'integer',
            enum: [0, 1, 2],
            title: 'The Question Variant Schema',
            default: 0,
            examples: [1]
          },
          question: {
            $id: '#/properties/test/items/properties/question',
            type: 'array',
            title: 'The Question Content Schema',
            items: {
              $id: '#/properties/test/items/properties/question/items',
              type: 'object',
              title: 'The Items Schema',
              required: ['variant', 'text'],
              properties: {
                variant: {
                  $id: '#/properties/test/items/properties/question/items/properties/variant',
                  type: 'integer',
                  title: 'The Variant Schema',
                  default: 0,
                  examples: [1]
                },
                text: {
                  $id: '#/properties/test/items/properties/question/items/properties/text',
                  type: 'string',
                  title: 'The Text Schema',
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
              title: 'The Items Schema',
              required: ['label', 'text'],
              properties: {
                label: {
                  $id: '#/properties/test/items/properties/choices/items/properties/label',
                  type: 'string',
                  title: 'The Label Schema',
                  default: '',
                  examples: ['A'],
                  pattern: '^(.*)$'
                },
                text: {
                  $id: '#/properties/test/items/properties/choices/items/properties/text',
                  type: 'string',
                  title: 'The Text Schema',
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
              title: 'The Items Schema',
              default: false,
              examples: [true, true, true, false]
            }
          },
          explanation: {
            $id: '#/properties/test/items/properties/explanation',
            type: 'array',
            title: 'The Explanation Schema'
          }
        }
      }
    }
  }
}

var validate = ajv.compile(schema)

export default function(data) {
  var valid = validate(JSON.parse(data))
  if (!valid) console.log(validate.errors)
  return valid ? 'valid' : `${validate.errors[0].schemaPath} - ${validate.errors[0].message}`
}
