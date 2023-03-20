import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl"
import { LoginUserException } from "../../../exceptions/LoginUserException";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('LoginUserUsecase', ()=>{
    // Selection Server Express
    const testUtilities = new TestUtilities();

    // Selection des services pour les tests
    testUtilities.selectService();
  
  beforeEach(async()=>{
    await UserGenerator.resteUser();
  });
  
  it('Should login user', async()=>{
    try {
      const { email, password } = { email: 'aviateur22@hotmail.fr', password: 'd' }

      const isLoginAuthorize = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({ email, password});
      
      expect(isLoginAuthorize).toBeTruthy();
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Should throw LoginUserException because email is unvalid', async()=>{
    try {
      const { email, password } = { email: 'aviateur22@hotmail.frj', password: 'd' }

      const isLoginAuthorize = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({ email, password });
      
      expect(isLoginAuthorize).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(LoginUserException);
    }
  });

  it('Should throw LoginUserException because password is unvalid', async()=>{
    try {
      const { email, password } = { email: 'aviateur22@hotmail.fr', password: 'e' }

      const isLoginAuthorize = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({ email, password});
      
      expect(isLoginAuthorize).toBeFalsy();
    } catch (error) {
      expect(error).toBeInstanceOf(LoginUserException);
    }
  });

})