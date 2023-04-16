export interface FriendResponseSchema {
  id: string;
  userId: string;
  friendId: string;
  friendEmail: string;
  relationId: string;
  relationAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
}