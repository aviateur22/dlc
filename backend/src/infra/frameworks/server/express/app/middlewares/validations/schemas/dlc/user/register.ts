import Joi from 'joi';
import messages from '../../../../../../../../../../domain/messages/messages'

export default Joi.object({
  // email     
  email:Joi
  .string()  
  .pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  .required()
  .messages({
    'string.empty': messages.message.emailMandatory,
    'string.pattern.base': messages.message.emailFormatError,
    'any.required': messages.message.emailMandatory
    }),

    // mote de passe
    password: Joi
    .string()
    .pattern(/^(?=.*?[A-Z])(?!.*?[ ])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
    .required()
    .messages({  
      'string.empty': messages.message.passwordMandatory,
      'string.pattern.base': messages.message.passwordFormatError,
      'any.required': messages.message.passwordMandatory
    }),

    // confirmation
    confirmPassword: Joi
    .string()
    .required()
    .equal(Joi.ref('password'))
    .messages({  
      'string.empty': messages.message.confirmPasswordMandatory,
      'any.required': messages.message.confirmPasswordMandatory,
      'any.only': messages.message.confirmPasswordError
    })
});