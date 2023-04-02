import { Component, Input } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { FriendRelationService } from 'src/app/infra/services/useCaseService/friend-relation.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend-display.component.html',
  styleUrls: ['./friend-display.component.css']
})
export class FriendDisplayComponent {
  
  @Input()
  friend: FriendResponseSchema | undefined;

  constructor(
    private friendRelationService: FriendRelationService
  ){}

  /**
   * Suppression ami
   */
  deleteFriend() {
    if(this.friend)
      this.friendRelationService.deleteOneFriend(this.friend);
  }
}
