/**
 * Database exception
 */
export class ErrorDatabaseException extends Error {  
  constructor(message: string) {
    super(message);
  }
}