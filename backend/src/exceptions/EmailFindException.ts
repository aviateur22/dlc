/**
 * Email exception
 */
export class EmailFindException extends Error {  
  constructor(message: string) {
    super(message);
  }
}