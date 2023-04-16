import { Component, Input } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { FriendRelationService } from 'src/app/infra/services/useCaseService/friend-relation.service';

@Component({
  selector: 'app-new-friend-relation',
  templateUrl: './friend-relation.component.html',
  styleUrls: ['./friend-relation.component.css']
})
export class NewFriendRelationComponent {

  @Input()
  friendRelation!: FriendResponseSchema | undefined;
  
  constructor( private friendService: FriendRelationService) {}

  /**
   * Accepte relation ami
   */
  acceptFriendRelation() {   
    if(this.friendRelation)       
      this.friendService.acceptFriendRelation(this.friendRelation);
  }

  /**
   * Refus de relation ami
   */
  refuseFriendRelation() {   
    if(this.friendRelation) 
      this.friendService.refuseFriendRelation(this.friendRelation);
  }

}
