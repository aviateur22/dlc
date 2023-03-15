import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { UserEntity } from "../../../domain/entities/user/UserEntity"
import { TestUtilities } from "../../utilities/TestUtilities";

describe('AddUserUsecase', ()=>{
  
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();


  it('Should add a new user', async()=> {
    try {
      const {email, password} = {email: 'd', password: 'd'};

      const user = await UseCaseServiceImpl.getUseCases().userUsecase.registerUserUseCase.execute({ email, password });
      
      expect(user).toBeInstanceOf(UserEntity);
    } catch (error) {
      expect(error).toBeFalsy();
    }

  });

})