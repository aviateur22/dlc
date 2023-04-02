import { NextFunction, Request, Response } from "express";
import { RelationEntity } from "../../../../../../../domain/entities/relation/RelationEntity";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";
import { UserFriendEntity } from "../../../../../../../domain/entities/friend/UserFriendEntity";

export default {

  /**
   * Validation d'une relation
   * 
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  acceptRelation: async(req: Request, res: Response, next: NextFunction): Promise<Response<RelationEntity>>=>{        
    const { relationId } = req.body;

    const acceptRelation: RelationEntity = await UseCaseServiceImpl.getUseCases().relationUseCase.acceptFriendRelationUseCase.execute(relationId);

    return res.status(200).json({      
      relation: acceptRelation
    });
  },

  /**
   * Refus d'une relation
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  refuseRelation: async(req: Request, res: Response, next: NextFunction):Promise<Response<RelationEntity>>=>{        

    const { friendId, relationId } = req.body;

    // Suppression de la relation
    const refuseRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.refuseFriendRelationUseCase.execute({
      friendId,
      relationId
    });

    return res.status(200).json({      
      relation: refuseRelation
    });
  },

  /**
   * Recherche nouvelle relation d'un utilisateur
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  findNewRelation: async(req: Request, res: Response, next: NextFunction):Promise<Response<UserFriendEntity>>=>{ 
    const userId = req.params.userId;
    const findNewRelation = await UseCaseServiceImpl.getUseCases().relationUseCase.findNewRelationUseCase.execute(userId);
    return res.json(findNewRelation);
  }
}