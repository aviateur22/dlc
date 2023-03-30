/**
 * Entité pour les données du JWT
 */
export class LogoutUserEntity {
  readonly jwtIdentifier: string;
  readonly JwtExpiredAt: string;

  constructor(id: string, iat: string) {
    console.log(iat);
    this.jwtIdentifier = id.trim();
    this.JwtExpiredAt = iat.toString().trim()
  }
}