import { UserFriendModel } from "../../../models/userFriend/UserFriendModel";
import { RepositoryServiceImpl } from "../../../services/repository/RepositoryServiceImpl";

export default {
  /**
   * Suppression UserFriendRelation
   * @param userFriendArray 
   * @param {string} userId 
   * @param {string} friendId 
   * @returns 
   */
  deleteUserFriendRelation:(userFriendArray: Array<UserFriendModel>,userId: string, friendId: string): UserFriendModel|null=>{
    
    let index = userFriendArray.findIndex(x=>(x.userId === userId && x.friendId === friendId));    

    if(index < 0) {
      return null;
    }
    
    let userFriend = userFriendArray[index];

    // Supprsion de l'item
    userFriendArray.splice(index, 1);

    return userFriend
  },

  /**
   * Ajout UserFriendRelation
   * @param {Array<UserFriendModel>} userFriendArray 
   * @param {object} addFriend
   * @returns 
   */
  addUserFriendRelation: async(userFriendArray: Array<UserFriendModel>, addFriend: {   
    userId: string,
    friendEmail: string,
    friendId: string,
    friendName: string,
    relationId: string,
    createdAt: Date,
    updatedAt: Date    
  }): Promise<UserFriendModel> => {    
    let id = userFriendArray.length === 0 ? 1 : Math.max(...userFriendArray.map(x=>Number(x.id))) + 1;

    // Recherche email de l'ami
    const userEmail = await RepositoryServiceImpl.getRepository().userRepository.findById(addFriend.friendId).then(result=>result!.email);
    
    let userFriend = {
      id: id.toString(),
      userId: addFriend.userId,
      friendEmail: userEmail,
      friendId: addFriend.friendId,
      friendName: addFriend.friendName,
      relationId: addFriend.relationId,
      createdAt: addFriend.createdAt,
      updatedAt: addFriend.updatedAt
    }

    return userFriend;
  }
}