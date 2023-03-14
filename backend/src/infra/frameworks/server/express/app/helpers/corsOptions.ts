import * as dotenv from "dotenv";
dotenv.config();

/**
 * Config des Cors
 */
export default ()=>{
    let corsOption = {        
        credentials: true,
        methods: 'GET,PUT,PATCH,POST,DELETE',
        origin: ['']
    };

    // Récupéraion de domaines
    let CORS_ORIGIN: string|undefined;
    
    if(process.env.NODE_ENV === 'DEV' || process.env.NODE_ENV === 'test'){
      console.log('en dev');
      CORS_ORIGIN = process.env.CORS_ORIGIN_DEV;       
    } else /**mode PRDODUCTION */    
    {        
      console.log('en prod');
      CORS_ORIGIN = process.env.CORS_ORIGIN_PROD;     
    }  
    
    if(typeof CORS_ORIGIN !== 'undefined') {
      corsOption.origin = CORS_ORIGIN.split(',');
    }

    // Renvoi des Opions
    return corsOption;
};