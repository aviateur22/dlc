import fastify, { FastifyError, FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { TodoNotFindException } from "../../../../../../exceptions/TodoNotFindException";

export default async function(error: FastifyError, request: FastifyRequest, reply:FastifyReply) {
  
  if(error instanceof fastify.errorCodes.FST_ERR_NOT_FOUND) {
    reply.code(404).send({
      errorMessage: error.message
    });
  } else if(error instanceof TodoNotFindException) {
    reply.code(400).send({
      errorMessage: error.message
    });
  } else 
  // let errorPropertyName;
  // let errorInstanc;
  // error.validation?.map(err=>{
  //   errorPropertyName = err.instancePath;
  //   errorInstanc = err.message;
  // });
  // console.log(error.message);
  // console.log(errorInstanc);
  //console.log(d);
  if (error.validation) {   
    //getValidationError(errorPropertyName) 
    reply.status(400).send({ 
      //statusCode: error.statusCode,
      //error: 'Bad dRequest',
      //message: `${Object.keys(validationErrors)}`,
      errorMessage: 'Il y a eu une erreur lors de la soumission des données',
      errorDetail: error.validation.map(err =>`${err.instancePath} - ${err.message}`)
      //message: error.validation.map(err =>`${err.instancePath} et ${err.message}`)
    });
  } else {
    reply.code(error.statusCode ? error.statusCode : 500).send({
      errorMessage: error.message
    })
  }
}

interface dataInterface {
  key: string,
  value: any
}

function iterateThrowObject(objectToIterate: any): dataInterface|undefined {
  for (const [key, value] of Object.entries(objectToIterate)) {    
    return {
      key, value
    }       
  }
}

function getValidationError(propertyName: string | undefined) {
 
  for (const [key, value] of Object.entries({})) {
    console.log(key, propertyName?.replace('/','').trim())
    if(key === propertyName?.replace('/','').trim()) {
      console.log(`${key}: ${value}`);
    }
 
  }
}