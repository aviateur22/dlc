import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl";

describe('AddUserUsecase', ()=>{
  it('Should add a new user', async()=> {
    try {
      const {email, password} = {email: 'd', password: 'd'};

      const user = UseCaseServiceImpl.getUseCases().userUsecase.addUserUseCase.execute({ email, password });
      
    } catch (error) {
      
    }

  });

})