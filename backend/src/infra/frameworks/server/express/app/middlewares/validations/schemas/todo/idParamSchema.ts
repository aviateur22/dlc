import Joi from 'joi';

/**
 * Validation de Id d'une Todo
 */
export default Joi.object({
  id: Joi
  .string()
  .min(1)
  .required()
  .messages({
      'string.empty': 'id is mandatory',
      'string.pattern.base': 'incorrect id format',
      'any.required': 'id is mandatory',
      'string.min': 'incorrect id format',
  })
})