import JoiImport from 'joi';
import joiDate from '@joi/date';
const Joi = JoiImport.extend(joiDate) as typeof JoiImport;

export default Joi.object({
    // Titre     
    userId:Joi
      .string()      
      .required()
      .messages({
        'string.empty': 'userId missing',
        'string.pattern.base': 'userId missing',
        'any.required': 'userId missing'
      }),

    // Description
    openDate: Joi
    .string()
    .required()
    .messages({  
      'string.empty': 'openDate is missing',
      'string.pattern.base': 'openDate is missing',
      'any.required': 'openDate is missing'
    })    
});