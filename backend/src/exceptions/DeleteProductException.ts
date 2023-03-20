/**
 * DeleteProduct exeption
 */
export class DeleteProductException extends Error {
  constructor(message: string) {
    super(message);
  }
}