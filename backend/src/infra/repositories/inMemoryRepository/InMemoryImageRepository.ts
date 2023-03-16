import { AddImageEntity } from "../../../domain/entities/image/AddImageEntity";
import { ImageRepositorySchema } from "../../../domain/ports/repositoriesSchemas/ImageRepositorySchema";
import { ImageModel } from "../../models/ImageModel";

export class InMemoryImagerepository implements ImageRepositorySchema {
  save(product: Partial<AddImageEntity>): Promise<ImageModel> {
    throw new Error("Method not implemented.");
  }
  findAll(): Promise<ImageModel[]> {
    throw new Error("Method not implemented.");
  }
  deleteAll(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}