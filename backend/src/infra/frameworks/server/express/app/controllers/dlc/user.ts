import { Request, Response, NextFunction } from "express";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";
import { JwtInfomration } from "../../../../../../helpers/security/jwt/JwtInfomration";
import { TokenJwt } from "../../../../../../helpers/security/jwt/TokenJwt";

export default {
  register: async(request: Request, response: Response, next: NextFunction)=>{
    console.log('controller register')
    response.status(201).json({
      message: 'Bonjour'
    });
  },

  login: async(req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const userLogin = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({
      email,
      password
    });

    //
    const jwtInfomration = new JwtInfomration({
      expiresIn: '1d',
      data: {
        userId: userLogin.id,
        role: userLogin.role
      }
    });

    const jwtToken = new TokenJwt(jwtInfomration);

    res.send('isLoginAuth');
  }
}