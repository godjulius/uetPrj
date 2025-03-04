import {SessionStorageService} from '../../../core/services/session-storage.service';
import {AfterViewInit, Component, inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {Router, RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BaseComponent} from '../../../core/base.component';
import {TranslatePipe} from '@ngx-translate/core';
import {Message} from 'primeng/message';
import {CardModule} from 'primeng/card';
import {AuthService} from '../auth.service';
import {environment} from '../../../../environments/environment';
import {LoginModel} from '../auth.model';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize} from 'rxjs';
import {AUTH_TOKEN} from '../../../core/constants/common.const';
import {CookieStorageService} from '../../../core/services/cookie-storage.service';
import {MessageService} from 'primeng/api';

declare var google: any;

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, RouterModule, TranslatePipe, Message, CardModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {
    loginForm!: FormGroup;
    authService = inject(AuthService)
    private router = inject(Router);
    sessionStorageService = inject(SessionStorageService)
    cookieService = inject(CookieStorageService)
    loading = false;
    messageService = inject(MessageService)
    constructor(private fb: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });

    }

    ngAfterViewInit() {
        this.renderGoogleSignInButton();
    }

    renderGoogleSignInButton() {
        google.accounts.id.initialize({
            client_id: environment['google_oauth2'],
            callback: (res: any) => this.signInGoogle(res),
            ux_mode: 'popup', // 🔹 Chuyển sang popup mode
        });

        // Redirect mode
        // google.accounts.id.initialize({
        //     client_id: environment['google_oauth2'],
        //     callback: (res: any) => this.signInGoogle(res),
        //     ux_mode: 'redirect', // 🔹 Chuyển sang redirect mode
        //     login_uri: 'http://localhost:4200' // 🔹 URL nhận dữ liệu sau khi đăng nhập
        // })
        google.accounts.id.renderButton(document.getElementById('google-signIn-btn'), {
            theme: 'filled_blue',
            size: 'large',
            shape: 'circle',
            width: '10px',
        });
    }

    login() {
        this.loading = true;
        if (this.loginForm.invalid) {
            return;
        }
        const account: LoginModel = {
            username: this.loginForm.value.email,
            password: this.loginForm.value.password
        }
        this.authService.login(account)
            .pipe(
                takeUntilDestroyed(this.destroyRef),
                finalize(() => {
                    this.loading = false;
                })
            )
            .subscribe((res: any) => {
                if (res) {
                    this.cookieService.setCookie(AUTH_TOKEN, res.access_token, 1);
                    this.messageService.add({severity: 'success', summary: 'Success', detail: 'Login successfully'});
                }
            })
    }

    isEmailInvalid(): boolean {
        const emailControl = this.loginForm.get('email');
        return emailControl!.invalid && (emailControl!.dirty || emailControl!.touched);
    }

    isPasswordInvalid(): boolean {
        const passwordControl = this.loginForm.get('password');
        return passwordControl!.invalid && (passwordControl!.dirty || passwordControl!.touched);
    }

    private decodeToken(token: string) {
        return JSON.parse(atob(token.split('.')[1]));
    }

    signInGoogle(res: any) {
        if (res) {
            console.log(res)
            const resPayload = this.decodeToken(res.credential);
            // Todo: Send the resPayload to the backend to verify the user
            this.sessionStorageService.setObject('googleUser', resPayload);
            console.log(resPayload);
            this.router.navigate(['/teacher']);
        }
    }

    signOutGoogle() {
        console.log(google)
        this.sessionStorageService.removeObject('googleUser');
        google.accounts.id.disableAutoSelect();
    }
}
