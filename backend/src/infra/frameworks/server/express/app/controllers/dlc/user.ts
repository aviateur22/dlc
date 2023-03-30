import { Request, Response, NextFunction } from "express";
import { LogoutUserEntity } from "../../../../../../../domain/entities/user/LogoutUserEntity";
import messages from "../../../../../../../domain/messages/messages";
import { UseCaseServiceImpl } from "../../../../../../../domain/services/UseCaseServiceImpl";
import { Token } from "../../../../../../helpers/security/csurf/Token";
import { GenerateJwtToken } from "../../../../../../helpers/security/jwt/GenerateJwtToken";
import { TokenSchema } from "../../../../../../ports/csurToken/TokenSchema";
import { ReqCookie } from "../../interfaces/ReqCookie";

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

  },

  /**
   * Logout
   * @param {Request} req 
   * @param {Response} res 
   * @param {NextFunction} next 
   */
  logout: async(req: ReqCookie, res: Response, next: NextFunction) =>{

    if(req.jwtInformation) {

      // Récupération informatoin
      const jwtInformation: LogoutUserEntity = {
        jwtIdentifier: req.jwtInformation.JwtIdentifier,
        JwtExpiredAt: req.jwtInformation.expiredAt
      }
      
      // Todo sauvgarde identifiant JWT
      const logout = await UseCaseServiceImpl.getUseCases().userUsecase.logoutUserUseCase.execute(jwtInformation);    
    }   

    res.clearCookie('authorization');
    res.send({
      message: messages.message.goodByeMessage
    })
  }
}