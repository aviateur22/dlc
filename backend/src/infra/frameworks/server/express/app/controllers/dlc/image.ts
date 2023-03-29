import { Request, Response, NextFunction } from "express";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";

export default {
  
  /**
   * 
   * @param req 
   * @param res 
   * @param next 
   * @returns 
   */
  findProductImage: async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    const {imageId} = req.params;
    const imageBase64 = await UseCaseServiceImpl.getUseCases().imageUseCase.findProductImageUseCase.execute(imageId);

    return res.json(imageBase64)
  }
}