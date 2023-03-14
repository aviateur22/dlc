import { LoggerException } from "../../../exceptions/LoggerException";
import { LoggerSelection } from "../../helpers/logger/LoggerSelection";

class LoggerServiceImpl {
  
  private static logger: LoggerSchema;

  /**
   * Selection du Logger
   * @param { number } LoggerSource
   */
  static setLogger(LoggerSource: number): void {
    if(!LoggerServiceImpl.logger) {
      const logger = new LoggerSelection();
      LoggerServiceImpl.logger  = logger.getLogger(LoggerSource);
    }
  }

  /**
   * Récupération du logger
   * @returns { LoggerSchema }
   */
  static getLogger(): LoggerSchema{
    // Repository non défini
    if(typeof LoggerServiceImpl.logger === 'undefined') {      
      throw new LoggerException('Logger not defined');     
    }
    return LoggerServiceImpl.logger;
  }

}

export { LoggerServiceImpl }