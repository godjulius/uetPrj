import {inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AVATAR, LOGIN, PROFILE, SIGNUP, USERINFO} from '../../core/constants/api.const';
import {IProfileModel, LoginModel, SignUpModel} from './auth.model';
import {catchError, map, Observable, of, Subject} from 'rxjs';
import {MessageService} from 'primeng/api';
import {CookieStorageService} from '../../core/services/cookie-storage.service';
import {AUTH_TOKEN} from '../../core/constants/common.const';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private readonly messageService = inject(MessageService);
    private readonly cookieStorageService = inject(CookieStorageService);
    profile: IProfileModel = {
        email: 'hai@gmail.com',
        fullName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: "other",
        bio: '',
        id: ''
    }
    profileObject = new Subject();
    avatarUrl: string | null = null;
    avatarObject = new Subject();

    constructor() {
        this.getUserInfo()
            .subscribe((res: any) => {
                if (res) {
                    this.profile = res;
                    this.profileObject.next(res);
                }
            })
        this.getAvatarUrl().subscribe((res: any) => {
            this.avatarObject.next(res)
        })
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
        return this.handleError(this.httpClient.get(`${this.baseUrl}${USERINFO}`))
    }


    updateProfile(profile: IProfileModel) {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${PROFILE}`, profile))
            .pipe(
                map((res: any) => {
                    this.profileObject.next(res)
                    return res;
                })
            )
    }

    getProfile() {
        return this.profile;
    }

    getAvatarUrl() {
        return this.httpClient.get(`${this.baseUrl}${AVATAR}`, {responseType: 'blob'})
            .pipe(
                map((res: any) => {
                    const objectURL = URL.createObjectURL(res);
                    this.avatarUrl = objectURL;
                    return objectURL;
                })
            )
    }

    postAvatar(avatar: File) {
        const formData = new FormData();
        formData.append('file', avatar);
        return this.handleError(this.httpClient.post(`${this.baseUrl}${AVATAR}`, formData))
            .pipe(
                map((res: any) => {
                    this.avatarObject.next(URL.createObjectURL(avatar));
                    return res;
                })
            );
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

    logout() {
        this.cookieStorageService.deleteCookie(AUTH_TOKEN);
    }
}
