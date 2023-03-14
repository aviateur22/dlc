import { ServerException } from "../../../exceptions/ServerException";
import { RepositoriesSelection } from "../../helpers/repositories/RepositoriesSelection";
import { ServerSelection } from "../../helpers/server/ServerSelection";

/**
 * Implementation de la base de données
 */
export class ServerServiceImpl {
  
  /**
   * Server actif
   */
  private static server: any;

  /**
   * Selection du server
   * @returns { void }
   */
  static setServer(serverSource: number): any {
    
    if(typeof ServerServiceImpl.server === 'undefined') {
      const serverSelection = new ServerSelection();
      ServerServiceImpl.server = serverSelection.getServer(serverSource);
    }
    return ServerServiceImpl.server;
  }

  /**
   * Renvoie le server
   * @returns {any}
   */
  static getServer(): any {
    if(typeof ServerServiceImpl.server === 'undefined') {
      throw new ServerException('Server not configure');
    }
    return ServerServiceImpl.server;
  }
}