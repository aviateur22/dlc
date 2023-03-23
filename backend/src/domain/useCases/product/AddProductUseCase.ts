import { AddProductException } from "../../../exceptions/AddProductException";
import { ErrorDatabaseException } from "../../../exceptions/ErrorDatabaseException";
import { ImageSizeException } from "../../../exceptions/ImageSizeException";
import { EncodeBase64 } from "../../../infra/helpers/security/EncodeBase64";
import { ProductMapper } from "../../dtos/ProductMapper";
import { AddImageEntity } from "../../entities/image/AddImageEntity";
import { AddProductEntity } from "../../entities/product/AddProductEntity";
import { ProductEntity } from "../../entities/product/ProductEntity";
import { ProductImageEntity } from "../../entities/product/ProductImageEntity";
import { AddProductUserEntity } from "../../entities/productUser/AddProductUserEntity";
import { ProductUserEntity } from "../../entities/productUser/ProductUserEntity";
import messages from "../../messages/messages";
import { UseCaseModel } from "../UseCaseModel";

export class AddProductUseCase extends UseCaseModel {
  
  async execute(addProduct: Partial<AddProductEntity>): Promise<ProductEntity> {

    if(!addProduct.image) {
      throw new AddProductException(messages.message.imageMandatory);
    }
    
    let addProductE: AddProductEntity = new AddProductEntity(addProduct);

    if(addProductE.image.size > 5000000) {
      throw new ImageSizeException(messages.message.imageSizeExceed);
    }
    
    // Convertion image en base64
    const imageBase64: string = EncodeBase64.encodeStringToBase64(addProduct.image.data);
    const mimeType: string = addProduct.image.mimetype;

    // Ajout de l'image    
    const addImage = await this.repositories.imageRepository.save(new AddImageEntity({
      imageBase64,
      mimeType
    }));

    if(!addImage) {
      throw new ErrorDatabaseException('error database');
    }

    const productImage = new ProductImageEntity({
      imageId: addImage.id,
      openDate: addProduct.openDate
    });

    // Ajout du produit
    const product = await this.repositories.productRepository.save(productImage);
  
    if(!product) {
      throw new ErrorDatabaseException('error database');
    }

    const productUser = new ProductUserEntity({
      productId: product.id,
      userId: addProduct.userId
    });

    // Ajout du ProduitUser
    const addProductUser = await this.repositories.productUserRepository.save(new AddProductUserEntity({...productUser}));

    if(!addProductUser) {
      throw new ErrorDatabaseException('error database');
    }

    return ProductMapper.getProductEntity({userId: addProduct.userId, ...product});
  }
}