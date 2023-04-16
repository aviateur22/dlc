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
  })
});