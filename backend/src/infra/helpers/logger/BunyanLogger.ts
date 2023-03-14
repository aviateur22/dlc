import bunyan from 'bunyan';

class BunyanLogger implements LoggerSchema {

  protected logger = bunyan.createLogger({
    name: 'todoApp',
    streams: [
        {
            level: 'error',
            path: './src/log/error.log',
            type: 'rotating-file',
            period: '1d',
            count: 4,
        }
    ]
});
  
  /**
   * Log le message
   */
  logMessage(message: string): void {
    this.logger.error(message);
  }  
}

export  { BunyanLogger }