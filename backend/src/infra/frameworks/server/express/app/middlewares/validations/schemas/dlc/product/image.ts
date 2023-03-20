import Joi from 'joi';

export default Joi.object({
    // Titre     
    image: Joi
    .any()
    .required()     
    .messages({ 
      'any.required': 'image is mandatory'
    })    
});