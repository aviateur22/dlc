/**
 * Exception Server
 */
export class ErrorServerException extends Error{
  constructor(message: string) {
    super(message);
  }
}