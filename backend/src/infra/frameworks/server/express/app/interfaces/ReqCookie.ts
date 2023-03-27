import { NextFunction, Request, Response } from "express";

export interface ReqCookie extends Request {

  // CookieList
  cookieList: any

  // Payload
  payload: any
}