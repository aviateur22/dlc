import { Request, Response, NextFunction } from "express";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";

export default {
  
  /**
   * Ajout produit
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  addProduct: async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({
        errorMessage: 'no file uploaded'
      });
    }
 
    const { userId, openDate } = req.body;
    const image: any = req.files.image;
  
    const addProduct = await UseCaseServiceImpl.getUseCases().productUsecase.addProductUseCase.execute({
      image,
      userId,
      openDate
    });
    console.log(req.files);
    return res.status(201).json({      
      product: addProduct
    });
  }
}