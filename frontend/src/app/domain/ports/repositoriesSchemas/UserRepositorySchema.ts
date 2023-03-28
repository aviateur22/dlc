import { Observable } from "rxjs";
import { ErrorResponseSchema } from "../EntitiesSchemas/ErrorResponseSchema";
import { LoginResponseSchema } from "../EntitiesSchemas/LoginResponseSchema";
import { LoginSchema } from "../EntitiesSchemas/LoginSchema";
import { LougoutResponseSchema } from "../EntitiesSchemas/LougoutResponseSchema";
import { RegisterSchema } from "../EntitiesSchemas/RegisterSchema";
import { UserSchema } from "../EntitiesSchemas/UserSchema";

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
  register(registerData: RegisterSchema): Observable<UserSchema|ErrorResponseSchema>;

  /**
   * Logout
   * @returns {Observable<LoginResponseSchema>}
   */
    logout(): Observable<LougoutResponseSchema>;
}