import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { error } from "console";
import { Observable, catchError, throwError, mergeMap, timer, retryWhen } from "rxjs";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            retryWhen(genericRetryStrategy({ excludedStatusCodes: [404] })),
            catchError((err) => {
                if (err instanceof ErrorEvent) {
                    console.log('this is an error in the code');
                } else {
                    console.log('this is an error return by the server');
                }
                return throwError(err);
            }),
        );
    }
}


export const genericRetryStrategy =
    ({
        maxRetryAttempts = 3,
        scalingDuration = 1000,
        excludedStatusCodes = [],
    }: {
        maxRetryAttempts?: number;
        scalingDuration?: number;
        excludedStatusCodes?: number[];
    } = {}) =>
        (attempts: Observable<any>) => {
            return attempts.pipe(
                mergeMap((error, i) => {
                    const retryAttempt = i + 1;
                    if (retryAttempt > maxRetryAttempts || excludedStatusCodes.find((e) => e === error.status)) {
                        return throwError(error);
                    }
                    return timer(retryAttempt * scalingDuration);
                }),
            );
        };