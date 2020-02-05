import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('passou no interceptor')
        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            let errorObj = error;

            if(errorObj.error){
                errorObj = errorObj.error;
            }

            if(!errorObj.status){
                 
                errorObj = JSON.parse(errorObj.error)
            }

            console.log("Erro detectado pelo interceptor");
            console.log(errorObj);

            return throwError(errorObj);
        }))
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};