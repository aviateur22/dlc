import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-round-button',
  templateUrl: './round-button.component.html',
  styleUrls: ['./round-button.component.css']
})
export class RoundButtonComponent {

  @Input()
  value: string ='';

  @Output()
  clickEmit: EventEmitter<any> = new EventEmitter();

  /**
   * Clique
   */
  buttonClick() {
    this.clickEmit.emit();
  }
}


