import { Router } from '@angular/router';
import { Component } from '@angular/core';
import localStorage from 'src/app/domain/helpers/localStorage';
import { LogoutUseCase } from 'src/app/domain/useCases/LogoutUseCase';
import { LogoutService } from 'src/app/infra/services/useCaseService/logout.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
    private router: Router,
    private logoutUsecase: LogoutUseCase,
    private logoutService: LogoutService
  ) { }

  /**
   * deconnexion
   */
  logout() {    
    /**
     * Deconnexion
     */
    const logoutResponse = this.logoutService.logoutResponseObservable.subscribe(logoutResponse=>{
      if(logoutResponse) {
        localStorage.clearAll();
        this.router.navigate(['/login']);
      }
    });

    this.logoutUsecase.execute();
  }

}
