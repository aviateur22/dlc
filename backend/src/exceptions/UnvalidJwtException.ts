/**
 * Exception JWT
 */
export class UnvalidJwtException extends Error {
  constructor(message: string) {
    super(message);
  }
}