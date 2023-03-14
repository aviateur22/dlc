/**
 * Erreur de validation de données
 */
class ValidationException extends Error {
  constructor(message: string) {
    super(message);
  }
}
export { ValidationException }