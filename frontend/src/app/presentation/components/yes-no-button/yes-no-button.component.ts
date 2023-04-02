import { Component, Directive, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-yes-no-button',
  templateUrl: './yes-no-button.component.html',
  styleUrls: ['./yes-no-button.component.css']
})
export class YesNoButtonComponent {
  areButtonVisible: boolean = true;

  @Input()
  textValueButton1: string = ''

  @Input()
  textValueButton2: string = ''

  @Output()
  clickEmitterButton1: EventEmitter<Event> = new EventEmitter();

  @Output()
  clickEmitterButton2: EventEmitter<any> = new EventEmitter();

  /**
   * Action button 1
   */
  clickButton1(e: Event) {
    this.clickEmitterButton1.emit();
  }

  /**
   * Action button 2
   */
  clickButton2(e: Event) {
    this.clickEmitterButton2.emit();
  }

  displayButtonToggle(e: Event) {
    console.log(e)
    e.stopPropagation();
    e.stopImmediatePropagation();
    this.areButtonVisible = !this.areButtonVisible;
  }
}
