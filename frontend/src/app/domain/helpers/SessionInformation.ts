import { Injectable } from "@angular/core";
import { UserAuthInformation } from "../ports/EntitiesSchemas/UserAuthInformation";

@Injectable({
  providedIn: 'root'
})
export class SessionInformation {
  
  /**
   * Récupération info user
   */
  getUserInformation(): UserAuthInformation {

    const userFromLocalStorage = localStorage.getItem('user');

    if(userFromLocalStorage) {      
      return {
        userId: JSON.parse(userFromLocalStorage).id,
        userEmail: JSON.parse(userFromLocalStorage).email,
        userRoleId: JSON.parse(userFromLocalStorage).role
      } 
    }

    throw new Error('');

  }
}