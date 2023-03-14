import Joi from 'joi';

export default Joi.object({
    // Email     
    email:Joi
      .string()
      .pattern(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
      .required()
      .messages({
        'string.empty': 'email mandatory',
        'string.pattern.base': 'incorrect email format',
        'any.required': 'email mandatory'
    })
});