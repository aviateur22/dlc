/**
 * Serialize Liste de Todos
 */
export default {
  type: 'object',
  properties: {
    todos: {
      type: 'array',
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