import { ProductGenerator } from "../tests/utilities/ProductGenerator";
import { TestUtilities } from "../tests/utilities/TestUtilities";
  
export default (async()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();
  await ProductGenerator.createProduct();  
  await ProductGenerator.createProduct();

})();