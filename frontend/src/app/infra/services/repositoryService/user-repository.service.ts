import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { LoginSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginSchema';
import { UserSchema } from 'src/app/domain/ports/EntitiesSchemas/UserSchema';
import { UserRepositorySchema } from 'src/app/domain/ports/repositoriesSchemas/UserRepositorySchema';
import { environment } from 'src/environments/environment';
import { RegisterSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterSchema';
import {  LoginResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginResponseSchema';
import { LougoutResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/LougoutResponseSchema';
import endPoint from '../../../domain/utils/endPoint';
import { RegisterResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterResponseSchema';
import { UserProductsResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsResponseSchema';
import { UserProductsSchema } from 'src/app/domain/ports/EntitiesSchemas/UserProductsSchema';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements UserRepositorySchema {


  constructor(private http: HttpClient) { }  

  private baseUrl: string = environment.domain + environment.api

  /**
   * Login
   * @param {LoginSchema} loginData 
   * @returns {Observable<LoginResponseSchema>}
   */
  login(loginData: LoginSchema): Observable<LoginResponseSchema> {
    return this.http.post<LoginResponseSchema>(this.baseUrl + endPoint.login.url, {
      email: loginData.email,
      password: loginData.password
    });
  };

  /**
   * Inscription
   * @param {RegisterSchema} registerData 
   * @returns {Observable<RegisterResponseSchema>}
   */
  register(registerData: RegisterSchema): Observable<RegisterResponseSchema> {
    return this.http.post<RegisterResponseSchema>(this.baseUrl + endPoint.register.url, {
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword
    });
  }

  /**
   * Récupération produits utilisateur
   * @param {UserProductsSchema} data
   * @returns {Observable<UserProductsResponseSchema>}
   */
  userProducts(data: UserProductsSchema): Observable<UserProductsResponseSchema> {
    return this.http.get<UserProductsResponseSchema>(this.baseUrl + endPoint.productsUser.url)
  }

  /**
   * Logout
   * @returns {Observable<LoginResponseSchema>}
   */
  logout(): Observable<LougoutResponseSchema> {
    return this.http.get<LougoutResponseSchema>(environment.api);
  }
}
