/**
 * Session Expirée
 */
export class SessionExpiredException extends Error {
  constructor(message: string) {
    super(message);
  }
}