/**
 * Schema d'implementation du logger
 */
interface LoggerSchema {

  /**
   * Log un message
   */
  logMessage(message: string): void
}