import { AddUserEntity } from "../../../domain/entities/user/AddUserEntity";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";
import { UserModelMapper } from "../../dto/UserModelMapper";

import { UserModel } from "../../models/UserModel";
import client from './connexion/databaseConnexion'

/**
 * User repo PostgreSQL
 */
export class PostgreSQLUserRepository implements UserRepositorySchema {

  /**
   * FindAll users
   */
  async findAll(): Promise<UserModel[]> {
    const users = await client.query('SELECT * FROM "user"').then(result=>{
      return UserModelMapper.getUserModelArray(result.rows);
    });
    return users;    
  } 

  /**
   * Recherche user par mail
   * @param {string} userEmail 
   * @returns {Promise<UserModel|null> }
   */
  async findByEmail(userEmail: string): Promise<UserModel|null> {
    const findUser = await client.query('SELECT * FROM "user" WHERE email=$1', [
      userEmail
    ]).then(result=>{

      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }

      // Data
      const data = result.rows.shift();
      return UserModelMapper.getUserModel(data);
    });

    return findUser;
  }

  /**
   * findUserById
   * @param { string } userId 
   * @returns {Promise<UserModel | null>} 
   */
  async findById(userId: string): Promise<UserModel | null> {

    const findUser = await client.query('SELECT * FROM "user" WHERE id=$1', [
      userId
    ]).then(result=>{

      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }
      
      // Data
      const data = result.rows.shift();
      return UserModelMapper.getUserModel(data);
    });

    return findUser;
  }

  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(user: AddUserEntity): Promise<UserModel|null> {
    const addUser = await client.query(`INSERT INTO "user" ("email", "password", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *`, [
      user.email, user.password, user.createdAt, user.updatedAt
    ]).then(result=>{

      // Pas de données
      if(result.rowCount === 0) {
        return null;
      }
      
      // Data
      const data = result.rows.shift();
      return UserModelMapper.getUserModel(data);
    });

    return addUser;

  }



  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "user" RESTART IDENTITY CASCADE');
  }
}