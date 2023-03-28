import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {

  // Tableau de FlashMessage
  private flashArray: Array<string> = [];

  // Observable 
  private flashMessageArray = new BehaviorSubject(this.flashArray);
  public flashMessageArrayObservable = this.flashMessageArray.asObservable(); 

  /**
   * Mise a jour du flash Message
   * @param message 
   */
  updateFlashMessage(message: string) {
    this.flashArray.push(message);
    this.flashMessageArray.next(this.flashArray);
    this.clearFlashMessage();
  }

  /**
   * Clear FlashMessage 5sec
   */
  private clearFlashMessage(){
    setTimeout(()=>{
      this.flashArray.pop();
      this.flashMessageArray.next(this.flashArray)
    }, 5000 )
  }

  constructor() { }
}
