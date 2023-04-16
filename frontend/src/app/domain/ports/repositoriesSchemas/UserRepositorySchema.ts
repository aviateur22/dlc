import { Observable } from "rxjs";
import { ErrorResponseSchema } from "../EntitiesSchemas/ErrorResponseSchema";
import { LoginResponseSchema } from "../EntitiesSchemas/LoginResponseSchema";
import { LoginSchema } from "../EntitiesSchemas/LoginSchema";
import { LogoutResponseSchema } from "../EntitiesSchemas/LogoutResponseSchema";
import { RegisterResponseSchema } from "../EntitiesSchemas/RegisterResponseSchema";
import { RegisterSchema } from "../EntitiesSchemas/RegisterSchema";
import { UserProductsResponseSchema } from "../EntitiesSchemas/UserProductsResponseSchema";
import { UserProductsSchema } from "../EntitiesSchemas/UserProductsSchema";

export interface UserRepositorySchema {

   /**
   * Login
   * @param {LoginSchema} loginData 
   * @returns {Observable<LoginResponseSchema>}
   */
  login(loginData: LoginSchema): Observable<LoginResponseSchema|ErrorResponseSchema>;

  /**
   * Inscription
   * @param {RegisterSchema} registerData 
   * @returns {Observable<UserSchema>}
   */
  register(registerData: RegisterSchema): Observable<RegisterResponseSchema|ErrorResponseSchema>;

  /**
   * Récupération produits utilisateur
   * @param {UserProductsSchema} data 
   */
  userProducts(data: UserProductsSchema): Observable<UserProductsResponseSchema>;

  /**
   * Logout
   * @returns {Observable<LoginResponseSchema>}
   */
    logout(): Observable<LogoutResponseSchema>;
}