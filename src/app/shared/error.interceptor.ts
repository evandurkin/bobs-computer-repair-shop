/*
=======================================
// Title: Bob’s Computer Repair Shop
// Date: 27 April 2022
// Authors: Evan Durkin, Keith Hall,
// Gustavo Roo Gonzalez, and Gunner Bradley
// Description: Error interceptor for BCRS.
=======================================
*/

import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import {  // Import interceptor
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router:Router){}

  // Interceptor
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
      return next.handle(req).pipe(catchError(err=>{

           // Handle 400 Errors
          if([404].indexOf(err.status) !== -1){
              this.router.navigate(['/session/404']);
          }

           // Handle 500 errors
          if([500].indexOf(err.status) !== -1) {
              this.router.navigate(['/session/500']);
          }

          // Otherwise, catch the error and throw
          const error={
              message: err.error.message || err.message,
              httpCode: err.error.httpCode || err.status,
              url: err.url
          }

          console.log(`HttpInterceptor error; origin:${error.url};message:${error.message};httpCode:${error.httpCode}`);

          return throwError(error);
      }));
  }
}
