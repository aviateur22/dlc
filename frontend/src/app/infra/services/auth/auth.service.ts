import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /**
   * Authentifié
   * @returns {boolean}
   */
  isAuthenticate(): boolean {
    return localStorage.getItem('user') ? true : false
  }

  /**
   * Admin
   * @returns 
   */
  isAdmin() {
    return false;
  }
}
