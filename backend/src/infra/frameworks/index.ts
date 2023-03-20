import * as dotenv from "dotenv";
dotenv.config();
import http from 'http';
import { LoggerServiceImpl } from '../services/logger/LoggerServiceImpl';
import { LoggerSource } from '../helpers/logger/LoggerSource';
import { RepositoryServiceImpl } from "../services/repository/RepositoryServiceImpl";
import { RepositorySources } from "../helpers/repositories/RepositorySources";
import { ServerServiceImpl } from "../services/server/ServerServiceImpl";
import { ServerSource } from "../helpers/server/ServerSource";
import { ServerException } from "../../exceptions/ServerException";


// Selection du server
const serverSource: number = ServerSource.express;
const app = ServerServiceImpl.setServer(serverSource);

//Initilaisation du logger
LoggerServiceImpl.setLogger(LoggerSource.bunyan);

// Initilisation repositories
RepositoryServiceImpl.setRepositories(RepositorySources.postgreSQL);

// Port
const PORT = process.env.PORT ?? 3000;

/**
 * Démarrage server fastify
 */
const fastify = async () => {
    try {
      await app.listen({ port: PORT})
      console.log(`server listening on ${app.server.address().port}`)
    } catch (err) {
        app.log.error(err)
      process.exit(1)
    }
}

/**
 * Démarrage server express
 */
const express = ()=>{
    // Http Server
    const server = http.createServer(app);

    server.listen(PORT, ()=>{
        console.log(`server listening on http://localhost:${PORT}`);
    });
}

switch(serverSource) {
    case ServerSource.express:
        express(); 
    break;
    case ServerSource.fastify: 
        fastify(); 
    break;
    default: throw new ServerException('server not implmented')
}



