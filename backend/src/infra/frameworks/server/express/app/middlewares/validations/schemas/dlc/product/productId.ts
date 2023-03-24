import JoiImport from 'joi';
import joiDate from '@joi/date';
import messages from '../../../../../../../../../../domain/messages/messages';
const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

export default Joi.object({
  // Titre     
  productId: Joi
  .string()      
  .required()
  .messages({
    'string.empty': messages.message.productIdMissing,
    'string.pattern.base': messages.message.productIdMissing,
    'any.required': messages.message.productIdMissing
  })
});