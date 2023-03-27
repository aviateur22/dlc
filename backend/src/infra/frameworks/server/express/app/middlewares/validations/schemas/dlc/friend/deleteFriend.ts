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

  //FriendId
  friendId: Joi
  .string()
  .required() 
  .messages({
    'string.empty': messages.message.friendIdMissing,    
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
})