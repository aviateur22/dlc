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
   * @param {Partial<FindUserEntity>} user 
   * @returns {UserModel}
   */
  async findByEmail(user: Partial<FindUserEntity>): Promise<UserModel|null> {
    const findUser = await client.query('SELECT * FROM "user" WHERE email=$1',[
      user.email
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
    const addUser = await client.query(`INSERT INTO "user" ("email", "password", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4) returning *`, [
      user.email, user.password, user.createdAt, user.updatedAt
    ]);

    return addUser.rows.shift()
  }

  /**
   * Supp.
   */
  async deleteAll(): Promise<void> {
    await client.query('TRUNCATE "user" RESTART IDENTITY CASCADE');
  }
}