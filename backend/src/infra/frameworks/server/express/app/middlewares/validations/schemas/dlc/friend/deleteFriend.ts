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
  })
})