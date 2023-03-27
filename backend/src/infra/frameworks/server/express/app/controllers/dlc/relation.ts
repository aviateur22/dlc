import { NextFunction, Request, Response } from "express";
import { RelationEntity } from "../../../../../../../domain/entities/relation/RelationEntity";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";

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
}