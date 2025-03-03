import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LOGIN, SIGNUP, USERINFO} from '../../core/constants/api.const';
import {LoginModel, SignUpModel} from './auth.model';
import {catchError, map, of, pipe} from 'rxjs';
import {AppMessageService} from '../../core/services/message.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private appMessageService = inject(AppMessageService);
    constructor() {
    }

    ngOnInit() {

    }

    login(account: LoginModel) {
        const formData = new URLSearchParams();
        formData.set('username', account.username);
        formData.set('password', account.password);
        const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
        return this.handleError(this.httpClient.post(`${this.baseUrl}${LOGIN}`, formData, {headers}));
    }

    signup(account: SignUpModel) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${SIGNUP}`, account));
    }

    getUserInfo() {
        this.httpClient.get(`${this.baseUrl}${USERINFO}`)
            .subscribe((res: any) => {
                console.log(res);
            });
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                if (error.status === 409) {
                    this.appMessageService.addError({summary: 'Error', detail: `Email already exists`});
                }
                return of(null);
            })
        );
    }
}
