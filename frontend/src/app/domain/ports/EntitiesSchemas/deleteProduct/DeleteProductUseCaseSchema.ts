import { ProductSchema } from "../ProductSchema";

export interface DeleteProductUseCaseSchema {
  product: ProductSchema,
  products: Array<ProductSchema>
}