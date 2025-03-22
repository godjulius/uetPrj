import {inject, Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpHandler,
    HttpHandlerFn, HttpHeaders,
    HttpInterceptor,
    HttpRequest
} from '@angular/common/http';
import {catchError, finalize, Observable, throwError} from 'rxjs';
import {CookieStorageService} from "./cookie-storage.service";
import {AUTH_TOKEN} from "../constants/common.const";
import {Router} from "@angular/router";
import {MessageService} from 'primeng/api';


@Injectable()
export class CommonInterceptor implements HttpInterceptor {
    private readonly requests: Array<HttpRequest<any>> = []
    router = inject(Router)
    private readonly messageService = inject(MessageService)

    constructor(private cookieService: CookieStorageService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const authToken = this.cookieService.getCookie(AUTH_TOKEN);
        // Clone the request to add the new header
        let headers = request.headers ? request.headers : new HttpHeaders();
        if (authToken) {
            headers = headers.append('Authorization', 'Bearer ' + authToken);
        }
        const cloneRequest = request.clone({headers})
        const authRequest = cloneRequest
        this.requests.push(authRequest)

        return next.handle(cloneRequest)
            .pipe(
                catchError((error: any) => {
                    if (error.status === 401) {
                        console.log(1)
                      // Handle 401 error
                        if (this.cookieService.getCookie(AUTH_TOKEN)) {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: `Unauthorized`});
                            this.cookieService.deleteCookie(AUTH_TOKEN);
                            this.router.navigate(['/account/login']);
                        } else {
                            this.messageService.add({severity: 'error', summary: 'Error', detail: `Invalid username or password`});
                        }
                      this.cookieService.deleteCookie(AUTH_TOKEN);
                      return throwError(() => new Error('Unauthorized'))
                    }
                    return throwError(() => error)
                }),
                finalize(() => {
                    const index = this.requests.indexOf(authRequest)
                    if (index >= 0) {
                        this.requests.splice(index, 1)
                    }
                })
            )
    }
}

export function commonInterceptor(req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    return next(req);
}
