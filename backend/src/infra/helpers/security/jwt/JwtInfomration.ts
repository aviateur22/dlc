import {v4 as uuidv4} from 'uuid';

export class JwtInfomration {
  algorithm: any = 'HS256';
  issuer: string = 'dlc';
  subject: string = 'no subject';
  jwtid: string = uuidv4();
  expiresIn: string = '';
  data: any;

  constructor(jwtData: Partial<JwtInfomration>) {

    let key: keyof typeof jwtData;
    for(key in jwtData) { 
      this[key] = typeof jwtData[key] !== 'undefined' ? jwtData[key] : this[key];
    }
  }
}