import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {LOGIN, SIGNUP, USERINFO} from '../../core/constants/api.const';
import {IProfileModel, LoginModel, SignUpModel} from './auth.model';
import {catchError, of} from 'rxjs';
import {MessageService} from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private readonly messageService = inject(MessageService);
    private profile: IProfileModel = {
        email: 'hai@gmail.com',
        fullName: '',
        phone: '',
        dob: '',
        gender: "other",
        bio: '',
        avatar: ''
    }


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
                // this.setProfile(res)
            });
    }

    setProfile(profile: IProfileModel) {
        this.profile = profile;
    }

    getProfile() {
        return this.profile;
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                if (error.status === 409) {
                    this.messageService.add({severity: 'error', summary: 'Error', detail: `Email already exists`});
                }
                return of(null);
            })
        );
    }
}
