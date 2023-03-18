import { AddUserEntity } from "../../../domain/entities/user/AddUserEntity";
import { FindUserEntity } from "../../../domain/entities/user/FindUserEntity";
import { UserRepositorySchema } from "../../../domain/ports/repositoriesSchemas/UserRepositorySchema";

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
    const users = await client.query('SELECT * FROM "user"');
    return users.rows;    
  } 

  /**
   * Recherche user par mail
   * @param {string} userEmail 
   * @returns {Promise<UserModel|null> }
   */
  async findByEmail(userEmail: string): Promise<UserModel|null> {
    const findUser = await client.query('SELECT * FROM "user" WHERE email=$1',[
      userEmail
    ]);

    if(findUser.rowCount > 0) {     
      return findUser.rows.shift();
    }

    return null;
  }

  /**
   * findUserById
   * @param { string } userId 
   * @returns {Promise<UserModel | null>} 
   */
  async findById(userId: string): Promise<UserModel | null> {
    const findUser = await client.query('SELECT * FROM "user" WHERE id=$1',[
      userId
    ]);

    if(findUser.rowCount > 0) {
      return findUser.rows.shift();
    }

    return null;
  }
  /**
   * Ajout utilisateur
   * @param {AddUserEntity} user 
   * @returns {UserModel}
   */
  async save(user: AddUserEntity): Promise<UserModel> {
    const addUser = await client.query(`INSERT INTO "user" ("email", "password", "created_at", "updated_at") VALUES ($1, $2, $3, $4) returning *`, [
      user.email, user.password, user.createdAt, user.updatedAt
    ]);

    return addUser.rows.shift() as UserModel
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "user" RESTART IDENTITY CASCADE');
  }
}