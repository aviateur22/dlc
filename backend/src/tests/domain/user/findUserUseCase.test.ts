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
    
  it('Should find a user byId', async()=>{
    try {
      const userId: string = '1';

      const findUser = await UseCaseServiceImpl.getUseCases().userUsecase.findUserUseCase.execute(userId);
  
      expect(findUser).toBeTruthy();
      
      expect(findUser).toEqual(expect.objectContaining({
        id: '1',
        email: 'aviateur22@hotmail.fr',
        createdAt: findUser!.createdAt,
        updatedAt: findUser!.updatedAt

      }))
    } catch (error) {
      expect(error).toBeFalsy();
    }  
  });

  it('Should throw UserNotFindException', async()=>{
    try {
      const userId: string = '1';
      const findUser = await UseCaseServiceImpl.getUseCases().userUsecase.findUserUseCase.execute(userId);
  
      expect(findUser).toBeTruthy();
      console.log(findUser);
      expect(findUser).toEqual(expect.objectContaining({
        id: '1',
        email: 'aviateur22@hotmail.fr',
        createdAt: findUser!.createdAt,
        updatedAt: findUser!.updatedAt

      }))
    } catch (error) {
      expect(error).toBeFalsy();
    }  
  });
})