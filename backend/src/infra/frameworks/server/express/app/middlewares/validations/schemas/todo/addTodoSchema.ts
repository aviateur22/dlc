import Joi from 'joi';

export default Joi.object({
    // Titre     
    title:Joi
      .string()      
      .required()
      .messages({
          'string.empty': 'title is mandatory',
          'string.pattern.base': 'incorrect title format',
          'any.required': 'title is mandatory'
        }),

    // Description
    description: Joi
    .string()
    .min(0)
    .messages({        
        'string.pattern.base': 'incorrect description'        
    })
    
});