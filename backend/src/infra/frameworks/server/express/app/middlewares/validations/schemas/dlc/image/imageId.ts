import Joi from 'joi';
import messages from '../../../../../../../../../../domain/messages/messages';

export default Joi.object({
  // Titre     
  imageId: Joi
  .string()      
  .required()
  .messages({
    'string.base' : messages.message.productImageBadformat,
    'string.empty': messages.message.productImageMissing,
    'string.pattern.base': messages.message.productImageMissing,
    'any.required': messages.message.productImageMissing
  })
});