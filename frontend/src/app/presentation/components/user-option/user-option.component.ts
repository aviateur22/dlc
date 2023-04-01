import { Router } from '@angular/router';
import { Component } from '@angular/core';
import localStorage from 'src/app/domain/helpers/localStorage';
import { LogoutUseCase } from 'src/app/domain/useCases/LogoutUseCase';
import { LogoutService } from 'src/app/infra/services/useCaseService/logout.service';
import url from 'src/app/domain/utils/url';

@Component({
  selector: 'app-user-option',
  templateUrl: './user-option.component.html',
  styleUrls: ['./user-option.component.css']
})
export class UserOptionComponent {

  isOptionDisplay: boolean = false;

  constructor(
    private router: Router,
    private logoutUsecase: LogoutUseCase,
    private logoutService: LogoutService
  ) { }

  /**
   * deconnexion
   */
  logout() {       
    const logoutResponse = this.logoutService.logoutResponseObservable.subscribe(logoutResponse=>{
      if(logoutResponse) {
        localStorage.clearAll();
        this.router.navigate([url.login]);
      }
    });

    this.logoutUsecase.execute();
  }

  navigateToUserAccount(e: Event) {
   // console.log(e);
   // e.stopPropagation();
    
    this.router.navigate([url.userAccount]);
  }

  displayOptionToggle() {
    this.isOptionDisplay = !this.isOptionDisplay;
  }

}
