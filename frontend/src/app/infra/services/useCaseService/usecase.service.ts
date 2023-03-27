import { Injectable } from '@angular/core';
import { LoginUseCase } from 'src/app/domain/useCases/LoginUseCase';
import { UserProductsUseCase } from 'src/app/domain/useCases/UserProductsUseCase';

@Injectable({
  providedIn: 'root'
})
export class UsecaseService {

  constructor(
    protected loginUseCase: LoginUseCase,
    protected userProductsUseCase: UserProductsUseCase
    ) { }
}
