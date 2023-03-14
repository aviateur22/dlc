/**
 * Exception liée au serveur
 */
export class ServerException extends Error {
  constructor(message: string) {
    super(message);
  }
}