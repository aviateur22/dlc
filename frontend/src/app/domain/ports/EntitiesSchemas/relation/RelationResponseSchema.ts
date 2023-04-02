export interface RelationResponseSchema {
  id: string;
  friendId: string;
  isAcceppted: boolean;
  isNew: boolean;
  friendEmail: string;
  createdAt: Date;
  updatedAt: Date;
}