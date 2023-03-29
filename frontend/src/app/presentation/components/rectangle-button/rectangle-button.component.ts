import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-rectangle-button',
  templateUrl: './rectangle-button.component.html',
  styleUrls: ['./rectangle-button.component.css']
})
export class RectangleButtonComponent {
  
  @Output() 
  clickEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  type: string ='button'

  @Input()
  value: string = ''

  /**
   * Action du click
   */
  click() {
    this.clickEmitter.emit();
  }
}
