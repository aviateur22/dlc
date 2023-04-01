import { Component } from '@angular/core';
import { FlashMessageService } from 'src/app/infra/services/flashMessage/flash-message.service';

@Component({
  selector: 'app-flash-message',
  templateUrl: './flash-message.component.html',
  styleUrls: ['./flash-message.component.css']
})
export class FlashMessageComponent {

  flashMessageArray: Array<string> = []
  constructor(private flashMessageService: FlashMessageService) {}

  ngOnInit() {

    this.flashMessageService.flashMessageArrayObservable.subscribe(messages => {
      this.flashMessageArray = messages
    })
  }
}
