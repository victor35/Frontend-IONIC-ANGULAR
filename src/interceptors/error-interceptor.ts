import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService,
        public alertCtrl: AlertController) { }

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


            switch (errorObj.status) {
                case 401:
                    this.handle401();
                    break;

                case 403:
                    this.handle403();
                    break;

                default:
                    this.handleDefaultError(errorObj);
            }
            return throwError(errorObj);
        }));
    }

    async handle401() {
        const alert = await this.alertCtrl.create({
            header: 'Erro 401',
            subHeader: "falha de autenticação",
            message: "Email ou senha incorretos",
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        await alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    async handleDefaultError(errorObj) {
        const alert = await this.alertCtrl.create({
            header: 'Erro ' + errorObj.status +  ': ' + errorObj.error,
            message: errorObj.message,
            backdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });

        await alert.present();
    }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};