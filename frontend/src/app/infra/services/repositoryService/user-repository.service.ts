import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { LoginSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginSchema';
import { UserSchema } from 'src/app/domain/ports/EntitiesSchemas/UserSchema';
import { UserRepositorySchema } from 'src/app/domain/ports/repositoriesSchemas/UserRepositorySchema';
import { environment } from 'src/environments/environment';
import { RegisterSchema } from 'src/app/domain/ports/EntitiesSchemas/RegisterSchema';
import {  LoginResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/LoginResponseSchema';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService implements UserRepositorySchema {  

  constructor(private http: HttpClient) { }

  login(loginData: LoginSchema): Observable<LoginResponseSchema> {
    return this.http.post<LoginResponseSchema>(environment.api, {
      email: loginData.email,
      password: loginData.password
    });
  };

  register(registerData: RegisterSchema): Observable<UserSchema> {
    return this.http.post<UserSchema>(environment.api, {
      email: registerData.email,
      password: registerData.password,
      confirmPassword: registerData.confirmPassword
    });
  }
}
