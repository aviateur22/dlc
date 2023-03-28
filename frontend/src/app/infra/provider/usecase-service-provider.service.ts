import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsecaseServiceProviderService {

  constructor() { }

  /**
   * Récupération des useCase
   * @param useCaseName 
   * @returns 
   */
  getUseCase(useCaseName: any): any {
    return new useCaseName()
   
  }
}
