import todoSerialize from './serialization/todoSerialize'

export default  {
  schema :{
    params: {
      type: 'object',
      properties: {
        id: { type: 'string', minLength: 1}        
      },
      required: ['id'],
      additionalProperties: false
    },
    response: {
      200: todoSerialize
    }
  }
}