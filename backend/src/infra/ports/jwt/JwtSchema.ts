import { JwtLoginDataSchema } from "./JwtLoginDataSchema";

/**
 * Schema pour génération JWT
 */
export interface JwtSchema {
  subject: string,
  expiresIn: string,
  // Payload 
  data: JwtLoginDataSchema, 
}