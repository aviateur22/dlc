import { Component, Input } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';

@Component({
  selector: 'app-new-friends-relation-modal',
  templateUrl: './new-friends-relation-modal.component.html',
  styleUrls: ['./new-friends-relation-modal.component.css']
})
export class NewFriendsRelationModalComponent {
  
  // Nouvelles relations
  @Input()
  newFriendRelations: Array<FriendResponseSchema> = []

  // Visibiliter modal
  isModalFriendVisible: boolean = false;

  // Fermeture Modal
  closeFriendModal() {
    this.isModalFriendVisible = false;
  }
}
