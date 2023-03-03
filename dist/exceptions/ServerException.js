"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerException = void 0;
/**
 * Exception liée au serveur
 */
class ServerException extends Error {
    constructor(message) {
        super(message);
    }
}
exports.ServerException = ServerException;
