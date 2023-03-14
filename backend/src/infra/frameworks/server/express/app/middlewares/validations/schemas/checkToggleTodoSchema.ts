import Joi from 'joi';

// Schema vérification modification status
export default Joi.object({
  id: Joi
  .any(),
  
  status: Joi
  .boolean()
});