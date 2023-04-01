import { Component, Input } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent {

  // liste des amis
  @Input()
  friends: Array<FriendResponseSchema> = [];
}
