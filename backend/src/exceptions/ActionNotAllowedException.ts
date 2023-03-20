/**
 * Exception ActionNotAlloewed
 */
export class ActionNotAllowedException extends Error {
  constructor(message: string) {
    super(message);
  }
}