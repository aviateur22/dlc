import { UseCaseServiceImpl } from "../../../domain/services/UseCaseServiceImpl"

describe('LoginUserUsecase', ()=>{
  it('Should login user', async()=>{
    try {
      const { email, password } = { email: 'avia', password: 'd' }

      const loginUser = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({ email, password});
      
    } catch (error) {
      
    }
  })
})