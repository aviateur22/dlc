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
    body: {
      type: 'object',
      properties: {
        status: { type: 'boolean' }
      },
      required: ['status'],
      additionalProperties: false
    },
    response: {
      200: todoSerialize
    }    
  }
}