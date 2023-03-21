import path from 'path';
import { promisify } from 'util';
import fs from 'fs';

export default { 
  /**
   * 
   * @param filePath 
   * @returns 
   */
  read: async(filePath: string): Promise<string> =>{ 
    try {
      //chargement lecture async
      const readFile =promisify(fs.readFile);

      //Lecture du fichier
      const textStream = await readFile(filePath,'utf8');

      return textStream;            
    } catch (error: any) {
      throw new Error(error.message);
    }        
  }
}
