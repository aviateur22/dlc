/**
 * LoginException
 */
export class LoginUserException extends Error {
  constructor(message: string) {
    super(message);
  }
}