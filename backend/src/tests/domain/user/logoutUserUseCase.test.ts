import { LogoutUserEntity } from "../../../domain/entities/user/LogoutUserEntity";
import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { UnvalidJwtException } from "../../../exceptions/UnvalidJwtException";
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";

describe('LogoutUseCase', ()=>{
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();

  beforeEach(async()=>{
    await UserGenerator.resteUser();
  });

  it('Should disconnect a user', async()=>{
    const userLogoutData: LogoutUserEntity = {
      jwtId: '454545',
      JwtIat: '455454'
    }

    const logout = await UseCaseServiceImpl.getUseCases().userUsecase.logoutUserUseCase.execute(userLogoutData);

    expect(logout).toBeTruthy();
  });

  it('Should throw UnvalidJwtException', async()=>{
    try {
      const userLogoutData: LogoutUserEntity = {
        jwtId: '',
        JwtIat: ''
      }
  
      const logout = await UseCaseServiceImpl.getUseCases().userUsecase.logoutUserUseCase.execute(userLogoutData);
  
      expect(logout).toBeFalsy();
      
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnvalidJwtException);
    }   
  });
})