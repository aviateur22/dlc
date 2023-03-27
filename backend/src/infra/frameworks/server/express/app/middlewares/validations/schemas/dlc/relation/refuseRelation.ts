import Joi from 'joi';
import messages from '../../../../../../../../../../domain/messages/messages';

/**
 * Schéma refus relation
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

  friendId: Joi
  .string()
  .required()
  .messages({
    'string.base': messages.message.userIdBadFormat,
    'string.empty': messages.message.friendIdMissing,
    'string.pattern.base': messages.message.friendIdMissing,
    'any.required': messages.message.friendIdMissing
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