/**
 * Serialize Todo
 */
export default {
  type: 'object',
  properties: {
    todo: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        title: { type: 'string'},
        description: { type: 'string'},
        status: { type: 'boolean'},
        updatedAt: { type: 'string'},
        createdAt: { type: 'string'},
      }
    }
  }
}