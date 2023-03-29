/**
 * ImageException
 */
export class ImageNotFindException extends Error {
  constructor(message: string) {
    super(message);
  }
}