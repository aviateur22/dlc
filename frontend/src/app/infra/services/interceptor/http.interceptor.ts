import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { FlashMessageService } from '../flashMessage/flash-message.service';
import localStorageAccess from 'src/app/domain/helpers/localStorage';

@Injectable()
export class HeadersHttpInterceptor implements HttpInterceptor { 

  constructor(private router: Router, private flashService: FlashMessageService){ }

  /**
   * Surcharge de HttpClient avec
   * Credential 
   * custom headers 
   * errorManager 
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Récupération token
    const token = localStorage.getItem('token');
    console.log(request.headers)
    if(token) {
      request = request.clone({
        
        withCredentials: true,        
        headers: request.headers.set('token', token),
      });
    } else {
      request = request.clone({
        withCredentials: true
    });
    }    
   
    return next.handle(request).pipe(tap(event => {
      if(event instanceof HttpResponse) {
        console.log(event.status)
      }
    },
    // Error
    error=> {
      const errorHttp: HttpErrorResponse = error;      
      const errorStatus: number = parseInt(errorHttp.status.toString(), 10);

      switch (errorStatus) {
        // Session Expirée
        case 401: localStorageAccess.clearAll(); this.router.navigate(['/login']); break;


        // Access Interdit
        case 403: this.router.navigate(['/403']); break;
        default: break;
      }

      this.flashService.updateFlashMessage(error.error.errorMessage);
     
    }
    ));
  }
}
   
