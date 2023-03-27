import { UserSchema } from "./UserSchema";

export interface LoginResponseSchema {
  user: UserSchema,
  token: string
}