import { NextFunction, Request, Response } from "express";
import { JwtInformation } from "./JwtInformation";

export interface ReqCookie extends Request {

  // CookieList
  cookieList: any

  // Payload
  payload: any,

  // Info sur le JWT
  jwtInformation: JwtInformation
}