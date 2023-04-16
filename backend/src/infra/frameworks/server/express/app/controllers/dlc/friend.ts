import { NextFunction, Request, Response } from "express";
import { UserFriendEntity } from "../../../../../../../domain/entities/friend/UserFriendEntity";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";
import { FindFriendsUseCase } from "../../../../../../../domain/useCases/friend/FindFriendsUseCase";

export default {

  /**
   * Ajout realtion ami user->friend et friend->user
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  addFriendRelation: async(req: Request, res: Response, next: NextFunction): Promise<Response<Array<UserFriendEntity>>>=>{        
    const { friendName, friendEmail, userId } = req.body;

    const addFriendRelation: Array<UserFriendEntity> = await UseCaseServiceImpl.getUseCases().friendUseCase.addFriendUseCase.execute({
      friendEmail,
      friendName,
      userId      
    });   
   
    return res.status(201).json({      
      friends: addFriendRelation
    });
  },

  /**
   * Recherche amis utilisateur
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  findFriendsByUserId:async(req: Request, res: Response, next: NextFunction): Promise<Response<Array<UserFriendEntity>>>=>{

    const userId = req.params.userId;

    // recherche amis
    const findFriends = await UseCaseServiceImpl.getUseCases().friendUseCase.findFriendsUseCase.execute(userId);

    return res.status(200).json(findFriends);
  },  

  /**
   * Suppr. relation ami user->friend et friend->user
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  deleteFriendRelation: async(req: Request, res: Response, next: NextFunction):Promise<Response<Array<UserFriendEntity>>>=>{        

    const { friendId, userId } = req.body;

    const deleteFriendRelation: Array<UserFriendEntity> = await UseCaseServiceImpl.getUseCases().friendUseCase.deleteFriendUseCase.execute({
      userId,
      friendId
    });

    return res.status(200).json({      
      friends: deleteFriendRelation
    });
  },
}