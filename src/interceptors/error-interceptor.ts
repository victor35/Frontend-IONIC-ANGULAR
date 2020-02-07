import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService){ }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
            let errorObj = error;

            if (errorObj.error) {
                errorObj = errorObj.error;
            }

            if (!errorObj.status) {

                errorObj = JSON.parse(errorObj.error)
            }

            console.log("Erro detectado pelo interceptor");
            console.log(errorObj);

            switch(errorObj.status){
                case 403:
                    this.handle403();
                    break;
            }

            return throwError(errorObj);
        })) 
    }

    handle403(){
        this.storage.setLocalUser(null);
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};