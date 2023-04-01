/**
 * Schema Prdouit
 */
export interface ProductSchema {
  id: string,
  imageId: string,
  mimeType: string,
  imageBase64: string,
  openDay: number,
  createdAt: Date,
  updatedAt: Date
}