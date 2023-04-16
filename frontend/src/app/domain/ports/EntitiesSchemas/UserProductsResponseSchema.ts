import { ProductSchema } from "./ProductSchema";

export interface UserProductsResponseSchema {
  products : {
    userId: string;
    userEmail: string,
    products: Array<ProductSchema>
  }
}