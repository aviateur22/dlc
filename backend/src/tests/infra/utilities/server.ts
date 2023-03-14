import http from 'http';
import { ServerSource } from '../../../infra/helpers/server/ServerSource';
import { ServerServiceImpl } from '../../../infra/services/server/ServerServiceImpl';
//import app from '../../../infra/frameworks/app'

/**
 * Class pour test uniatire
 */
class Server {

  // Port
  protected port: string; 

  constructor(port: string) {
    this.port = port;
  }

  /**
   * Démarrage du server
   */
  async startServer(): Promise<void> {
    // Selection du server
    const app = ServerServiceImpl.setServer(ServerSource.express);

    // Chargement du server
    const server = http.createServer(app);       

    server.listen(this.port, () => {  
      console.log(`http://localhost:${this.port}`);
    });

  }
}
export { Server }

