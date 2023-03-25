import Joi from 'joi';
import messages from '../../../../../../../../../../domain/messages/messages';

export default Joi.object({

  // userId
  userId: Joi
  .string()
  .required()
  .messages({
    'string.empty': messages.message.userIdMissing,
    'any.required': messages.message.userIdMissing
  }),

  // Email ami
  friendEmail: Joi
  .string()
  .required()
  .pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  .messages({
    'string.empty': messages.message.friendEmailMissing,
    'string.pattern.base': messages.message.emailFormatError,
    'any.required': messages.message.friendEmailMissing
  }),

  // Nom de l'ami
  friendName: Joi
  .string()
  .required()
  .messages({
    'string.empty': messages.message.friendNameMissing,    
    'any.required': messages.message.friendNameMissing
  })
})