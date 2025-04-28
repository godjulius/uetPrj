import {DestroyRef, inject, Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {AVATAR, INSTRUCTOR, LOGIN, PROFILE, SIGNUP, USERINFO} from '../../core/constants/api.const';
import {IProfileModel, LoginModel, SignUpModel} from './auth.model';
import {BehaviorSubject, catchError, map, Observable, of, throwError} from 'rxjs';
import {MessageService} from 'primeng/api';
import {CookieStorageService} from '../../core/services/cookie-storage.service';
import {AUTH_TOKEN, USER} from '../../core/constants/common.const';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {LocalStorageService} from '../../core/services/local-storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {
    private readonly baseUrl = environment.baseUrl;
    private httpClient = inject(HttpClient);
    private readonly messageService = inject(MessageService);
    private readonly cookieStorageService = inject(CookieStorageService);
    private readonly localStorageService = inject(LocalStorageService)
    private readonly destroyRef = inject(DestroyRef)
    profile: IProfileModel = {
        email: '...@gmail.com',
        fullName: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: "other",
        bio: '',
        id: '',
        avatar: '',
        isInstructor: null
    }
    profileObject = new BehaviorSubject<IProfileModel>(this.profile);

    constructor() {
        if (this.cookieStorageService.getCookie(AUTH_TOKEN)) {
            this.profileObjectEmit()
        }
    }

    ngOnInit() {

    }

    isLoggedin() {
        return !!this.cookieStorageService.getCookie(AUTH_TOKEN);
    }

    profileObjectEmit() {
        this.getUserInfo()
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((res: IProfileModel) => {
                if (res) {
                    this.profile = res;
                    this.profileObject.next(res);
                    this.localStorageService.setObject(USER, res)
                }
            })
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

    postAvatar(avatar: File) {
        const formData = new FormData();
        formData.append('file', avatar);
        return this.handleError(this.httpClient.post(`${this.baseUrl}${AVATAR}`, formData))
            .pipe(
                map((res: any) => {
                    this.profileObject.next(res);
                    return res;
                })
            );
    }

    logout() {
        this.cookieStorageService.deleteCookie(AUTH_TOKEN);
        this.localStorageService.clear();
    }

    registerInstructor() {
        return this.handleError(this.httpClient.post(`${this.baseUrl}${INSTRUCTOR}`, {}))
    }

    handleError(observable: any) {
        return observable.pipe(
            catchError((error: any) => {
                if (error.status === 409) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Email already exists'
                    });
                    return of(null);
                }
                return throwError(() => error);
            })
        );
    }
}
