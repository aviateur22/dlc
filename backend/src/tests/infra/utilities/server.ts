import http from 'http';
import { ServerSource } from '../../../infra/helpers/server/ServerSource';
import { ServerServiceImpl } from '../../../infra/services/server/ServerServiceImpl';
//import app from '../../../infra/frameworks/app'

/**
 * Class pour test uniatire
 */
export class Server {

  // Port
  protected port: string; 

  constructor(port: string) {
    this.port = port;
  }

  /**
   * Démarrage du server
   * @param {number} selectService
   */
  async startServer(selectService: number): Promise<void> {
    // Selection du server
    const app = ServerServiceImpl.getServer();
    
    switch(selectService) {
      case ServerSource.express:
        // Chargement du server
        //const server = http.createServer(app);       

        http.createServer(app).listen(this.port, () => {  
          console.log(`http://localhost:${this.port}`);
        });
      break;

      case ServerSource.fastify: 
        await app.listen({ port: this.port})
        console.log(`server listening on ${app.server.address().port}`)
      break;
      
      default: 
      break;
    }

    // // Chargement du server
    // const server = http.createServer(app);       

    // server.listen(this.port, () => {  
    //   console.log(`http://localhost:${this.port}`);
    // });

  }
}

