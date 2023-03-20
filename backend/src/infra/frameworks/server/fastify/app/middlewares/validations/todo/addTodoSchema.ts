import todoSerialize from './serialization/todoSerialize'

export default  {
  schema :{
    body: {
      type: 'object',
      properties: {
        title: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 0 }
      },
      required: ['title'],
      errorMessage: {
        properties: {
          'title': 'Please provide a valid username'
        },
        required: {
          'title': 'Please provide a username'
        }
      },
      additionalProperties: false
    },
    response: {
      201: todoSerialize
    }
  }
}




// export default {
//   type: 'object',
//   properties: {
//     title: { type: 'string', minLength: 2 },
//     description: { type: 'string', minLength: 2 }, 
    
//   },
//   errorMessage: {
//     required: {
//       title: 'fhhfhdhd'
//     }
//   }
// }