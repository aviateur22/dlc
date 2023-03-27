import Joi from 'joi';
import messages from '../../../../../../../../../../domain/messages/messages';

/**
 * Schéma validation relation
 */
export default Joi.object({

  relationId: Joi
  .string()
  .required()
  .messages({
    'string.base': messages.message.relationIdBadeFormat,
    'string.empty': messages.message.relationIdMissing,
    'string.pattern.base': messages.message.relationIdMissing,
    'any.required': messages.message.relationIdMissing
  }),

  // Token csurf
  token: Joi
  .string()
  .required()
  .messages({
    'string.base': messages.message.tokenFormat,
    'string.empty': messages.message.tokenMissing,
    'string.pattern.base': messages.message.tokenMissing,
    'any.required': messages.message.tokenMissing
  })
});