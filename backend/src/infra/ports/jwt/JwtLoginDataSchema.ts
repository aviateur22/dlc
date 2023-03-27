/**
 * Payload JWT au login
 */
export interface JwtLoginDataSchema {
  userId: string,
  roleId: number,

  // Token pour vérification CSURF
  token: string
}