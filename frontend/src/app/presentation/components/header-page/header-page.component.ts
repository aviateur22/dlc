import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-header-page',
  templateUrl: './header-page.component.html',
  styleUrls: ['./header-page.component.css']
})
export class HeaderPageComponent {

  @Output()
  headerButtonEmitter: EventEmitter<any> = new EventEmitter();

  @Input()
  headerTitle: string = '';

  @Input()
  buttonHeaderText: string = '';

  /**
   * Redirection 
   */
  headerButtonClick() {
    this.headerButtonEmitter.emit();
  }
}
