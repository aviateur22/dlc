import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('finUserUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await UserGenerator.resteUser();
  });
    
  it('Should find a user by mail', async()=>{
    try {
      const email: string = 'aviateur22@hotmail.fr';

      const findUser = await UseCaseServiceImpl.getUseCases().userUsecase.findUserUseCase.execute({ email });
  
      expect(findUser).toBeTruthy()
    } catch (error) {
      expect(error).toBeFalsy();
    }
  
  })
})