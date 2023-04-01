import { Component, Input } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';

@Component({
  selector: 'app-friend',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.css']
})
export class FriendDisplayComponent {
  
  @Input()
  friend: FriendResponseSchema | undefined;
}
