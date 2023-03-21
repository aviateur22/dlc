import fileReader  from "../infra/helpers/file/fileReader";
import client from "../infra/repositories/postgreSQL/connexion/databaseConnexion"
import path from 'path';

export default (async()=>{
  try {
    const filePath = path.join(__dirname,'seeding.sql' );
    console.log(filePath);
    const queryText = await fileReader.read(filePath);

    //excution de la requete sql
    await client.query(queryText);       
    
  } catch (error: any) {
    console.log(error.message)
    return console.log('echec reset database');
  }   
})();