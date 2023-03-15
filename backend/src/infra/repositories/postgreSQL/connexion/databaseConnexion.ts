import { Pool } from 'pg';
import * as dotenv from "dotenv";
dotenv.config();

const config: any = {};

/**la variable NODE_ENV est inclue dans HEROKU */
if(process.env.NODE_ENV === 'production') {
    console.log( `database.js - ENV: production - DATABASE: ${process.env.DATABASE_URL}`)
    config.connectionString = process.env.DATABASE_URL;
    config.ssl = {
        rejectUnauthorized: false,
     }
 } else {
     console.log( `database.js - ENV: DEV - DATABASE: ${process.env.DATABASE_URL_DEV}`)
     config.connectionString = process.env.DATABASE_URL_DEV;       
 };

const pool = new Pool(config);

export default pool;