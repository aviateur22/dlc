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
  })
});
