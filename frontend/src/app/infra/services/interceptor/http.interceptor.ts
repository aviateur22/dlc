import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';
import { filter, map, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeadersHttpInterceptor implements HttpInterceptor { 

  constructor(private router: Router){ }

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
    const token = localStorage.getItem('token');    
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
    error=> {
      // Si erreur 403 ou 401
      if(error.status.toString() === '403' || error.status.toString() === '403') {
        this.router.navigate(['/403']);
      } 
    }
    ));
  }
}
   
