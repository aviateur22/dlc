/**
 * ProductNotFindException
 */
export class ProductNotFindException extends Error {
  constructor(message: string) {
    super(message);
  }
}