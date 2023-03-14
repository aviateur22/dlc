export default {
  schema: {
    body: {
      type: 'object',
      properties: {
        mail: { type: 'string', minLength: 2, pattern: "(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)" }        
      },
      required: ['mail'],
      additionalProperties: false
    }
  }
}