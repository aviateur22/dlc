export default {
  params: {

  },
  body: {
    type: 'object',
    properties: {
      title: { type: 'string', minLength: 2 },
      description: { type: 'string', minLength: 0 }
    },
    required: ['title'],
    errorMessage: {
      properties: {
        'title': 'title must be a string'
      },
      required: {
        'title': 'title is mandatory'
      }
    },
    additionalProperties: false  
  }
}

// export default {
//   type: 'object',
//   properties: {
//     title: { type: 'string', minLength: 1 },
//     description: { type: 'string', minLength: 0 }
//   },
//   required: ['title'],
//   errorMessage: {
//     properties: {
//       'title': 'title must be a string'
//     },
//     required: {
//       'title': 'title is mandatory'
//     }
//   },
//   additionalProperties: false  
// }