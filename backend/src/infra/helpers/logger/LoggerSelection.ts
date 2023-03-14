import { BunyanLogger } from "./BunyanLogger";

/**
 * Selection du logger
 */
class LoggerSelection {

  /**
   * Renvoie un nouvelle instance de logger
   * @param { number } loggerSource 
   * @returns { LoggerSchema }
   */
  getLogger(loggerSource: number): LoggerSchema {

    switch(loggerSource) {

      // Bunyan
      case 1: 
        return this.bunyanLogger();
      break;
      default: 
        return this.bunyanLogger();
      break;
    }
  }

  /**
   * Logger Bunyan
   * @returns 
   */
  private bunyanLogger(): LoggerSchema {
    return new BunyanLogger();
  }
}

export { LoggerSelection }