import { Component } from '@angular/core';
import { FriendResponseSchema } from 'src/app/domain/ports/EntitiesSchemas/friend/FriendResponseSchema';
import { FriendRelationService } from 'src/app/infra/services/useCaseService/friend-relation.service';

@Component({
  selector: 'app-new-friend-list',
  templateUrl: './new-friend-list.component.html',
  styleUrls: ['./new-friend-list.component.css']
})
export class NewFriendListComponent {

  // Liste des nouvelles relations
  newFriendRelations: Array<FriendResponseSchema> = [];

  constructor(
    private friendService: FriendRelationService
  ){ }

  ngOnInit() {

    this.friendService.findNewFriendRelation();

    this.friendService.newFriends.subscribe(newFriendRelationList=>{
      this.newFriendRelations = newFriendRelationList
    });
  }
}
