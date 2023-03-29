import { Request, Response, NextFunction } from "express";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";
import { Token } from "../../../../../../helpers/security/csurf/Token";
import { GenerateJwtToken } from "../../../../../../helpers/security/jwt/GenerateJwtToken";
import { TokenSchema } from "../../../../../../ports/csurToken/TokenSchema";

export default {
  /**
   * Register
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next   * 
   */
  register: async(req: Request, res: Response, next: NextFunction)=>{
    const { email, password } = req.body;
    const userRegister = await UseCaseServiceImpl.getUseCases().userUsecase.registerUserUseCase.execute({
      email,
      password
    });

    res.status(201).json({
      user: userRegister
    })
  },

  /**
   * Login
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  login: async(req: Request, res: Response, next: NextFunction) => {

    const { email, password } = req.body;

    const userLogin = await UseCaseServiceImpl.getUseCases().userUsecase.loginUserUseCase.execute({
      email,
      password
    });

    const token: TokenSchema = await Token.generate();

    const loginJwt = await GenerateJwtToken.getToken({
      expiresIn: '1d',
      subject: 'login',
      data: {
        userId: userLogin.id,
        roleId: userLogin.role,
        token: token.cookieToken
      }     
    });

    res.cookie('authorization', loginJwt, { secure: false, sameSite:"lax", httpOnly: true });
    res.json({
      user: userLogin,
      token: token.payloadToken 
    });

  }
}