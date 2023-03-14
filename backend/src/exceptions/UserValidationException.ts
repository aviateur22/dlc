/**
 * User validation exception
 */
export class UserValidationException extends Error {
  
  constructor(message: string) {
    super(message);
  }
}