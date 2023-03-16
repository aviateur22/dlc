import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";
import { UserEntity } from "../../../domain/entities/user/UserEntity"
import { TestUtilities } from "../../utilities/TestUtilities";
import { UserGenerator } from "../../utilities/UserGenerator";
import { UserRegisterException } from "../../../exceptions/UserRegisterException";
import userMessages from "../../../exceptions/message/userMessages";
import { RepositoryServiceImpl } from "../../../infra/services/repository/RepositoryServiceImpl";

describe('AddUserUsecase', ()=>{
  
  // Selection Server Express
  const testUtilities = new TestUtilities();

  // Selection des services pour les tests
  testUtilities.selectService();
  
  beforeEach(async()=>{
    await UserGenerator.resteUser();
  });

  it('Should add a new user', async()=> {
    try {
      const {email, password} = {email: 'd', password: 'd'};
      const user = await UseCaseServiceImpl.getUseCases().userUsecase.registerUserUseCase.execute({ email, password });
     
      const users = await RepositoryServiceImpl.getRepository().userRepository.findAll();
      const addUserInArray = users.map(user=>{
        return {
          id: user.id.toString(),          
          ...{email: user.email, password: user.password, createdAt: user.createdAt, updatedAt: user.updatedAt}
        }
      })[users.length-1];
      
      expect(user).toBeInstanceOf(UserEntity);
      expect(users.length).toBe(3);
      
      expect(addUserInArray).toEqual(expect.objectContaining({
          id: "3",
          email: "d"
        })
      );
    } catch (error) {
      expect(error).toBeFalsy();
    }
  });

  it('Should throw UserRegisterExcption because email already exist ', async()=>{
    try {
      const {email, password} = {email: 'aviateur22@hotmail.fr', password: 'd'};
      const user = await UseCaseServiceImpl.getUseCases().userUsecase.registerUserUseCase.execute({ email, password });      
      expect(user).toBeFalsy();
    } catch (error: any) {
      expect(error).toBeInstanceOf(UserRegisterException);
      expect(error).toHaveProperty('message');
      expect(error.message).toBe(userMessages.user.emailExist);
    }


  })
})