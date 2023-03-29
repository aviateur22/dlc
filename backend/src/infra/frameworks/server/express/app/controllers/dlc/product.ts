import { Request, Response, NextFunction } from "express";
import { ProductEntity } from "../../../../../../../domain/entities/product/ProductEntity";
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

    return res.status(201).json({      
      product: addProduct
    });
  },

  /**
   * Suppr. produit
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  deleteProduct: async(req: Request, res: Response, next: NextFunction): Promise<Response<ProductEntity>>=>{
    const productId = req.params.productId;
    const { userId } = req.body    
  
    // Suppression prodyut
    const deleteProduct = await UseCaseServiceImpl.getUseCases().productUsecase.deleteProductUseCase.execute({
     productId,
     userId
    });
    
    return res.status(200).json({      
      product: deleteProduct
    });
  },

  /**
   * Produits par user
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   * @returns {Promise<Response>}
   */
  getAllProductUserId: async(req: Request, res: Response, next: NextFunction): Promise<Response>=>{
    const {userId} = req.params;
    const products = await UseCaseServiceImpl.getUseCases().productUsecase.findProductsOfUserUseCase.execute(userId);

    return res.json({
      products
    })

  }
}