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
        title: { type: 'string', minLength: 1 },
        description: { type: 'string', minLength: 0 },
        status: { type: 'boolean'}
      },
      required: ['title', 'status'],
      additionalProperties: false
    },
    response: {
      200: todoSerialize
    }    
  }
}