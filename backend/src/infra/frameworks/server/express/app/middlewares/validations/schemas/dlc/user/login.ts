import Joi from 'joi';
import messages from '../../../../../../../../../messages/messages'


export default Joi.object({
    // Titre     
    email:Joi
      .string()      
      .required()
      .messages({
        'string.empty': messages.message.emailMandatory,
        'string.pattern.base': messages.message.emailMandatory,
        'any.required': messages.message.emailMandatory
      }),

    // Description
    password: Joi
    .string()
    .required()
    .messages({  
      'string.empty': messages.message.passwordMandatory,
      'string.pattern.base': messages.message.passwordMandatory,
      'any.required': messages.message.passwordMandatory
    })
});