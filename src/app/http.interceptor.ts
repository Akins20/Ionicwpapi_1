import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest;

        let requestUrl = 'https://akinsblog.000webhostapp.com';
        //   if (request.url.includes('api') || request.url.includes('jwt')) {
        if (request.url.includes('jwt')) {
            requestUrl = `${environment.origin}${request.url}`;
        } else {
            requestUrl = `${environment.origin}${environment.wcEndpoint}/${request.url}`;
        }
        authRequest = request.clone({
            url: requestUrl
        });

        return next.handle(authRequest)
            .pipe(
                catchError(err => {
                    if (err instanceof HttpErrorResponse && err.status === 0) {
                        console.log('Check Your Internet Connection And Try again Later');
                    } else if (err instanceof HttpErrorResponse && err.status === 401) {
                        // Todo refresh token
                    }
                    return throwError(err);
                })
            );
    }
}