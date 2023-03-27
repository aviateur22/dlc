import JoiImport from 'joi';
import joiDate from '@joi/date';
import messages from '../../../../../../../../../../domain/messages/messages';
const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

export default Joi.object({
  // Titre     
  userId:Joi
    .string()      
    .required()
    .messages({
      'string.base': messages.message.userIdBadFormat,
      'string.empty': messages.message.userIdMissing,
      'string.pattern.base': messages.message.userIdMissing,
      'any.required': messages.message.userIdMissing
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