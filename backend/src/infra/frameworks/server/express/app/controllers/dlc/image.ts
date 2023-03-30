import { Request, Response, NextFunction } from "express";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";

export default {
  
  /**
   * Recherche d'une image d'un produit
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  findProductImage: async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    const {imageId} = req.params;
    const productImage = await UseCaseServiceImpl.getUseCases().imageUseCase.findProductImageUseCase.execute(imageId);    
    return res.json({
      imageId: productImage?.id,
      imageBase64: productImage?.imageBase64,
      imageMimeType: productImage?.mimeType
    })
  }
}