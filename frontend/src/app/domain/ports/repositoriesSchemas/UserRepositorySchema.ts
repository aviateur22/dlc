import { Observable } from "rxjs";
import { LoginResponseSchema } from "../EntitiesSchemas/LoginResponseSchema";
import { LoginSchema } from "../EntitiesSchemas/LoginSchema";
import { RegisterSchema } from "../EntitiesSchemas/RegisterSchema";
import { UserSchema } from "../EntitiesSchemas/UserSchema";

export interface UserRepositorySchema {

  login(loginData: LoginSchema): Observable<LoginResponseSchema>;

  register(registerData: RegisterSchema): Observable<UserSchema>;
}